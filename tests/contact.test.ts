import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { POST } from '../app/api/contact/route';

const SITE = 'http://localhost:3000';
const valid = { name: 'Ada', email: 'ada@example.com', message: 'Do you take on side projects?' };

/** Posted as the form does without JavaScript: URL-encoded, from /about. */
function post(fields: Record<string, string>, referer = `${SITE}/about`) {
  return POST(
    new Request(`${SITE}/api/contact`, {
      method: 'POST',
      body: new URLSearchParams(fields).toString(),
      headers: { 'content-type': 'application/x-www-form-urlencoded', referer },
    }),
  );
}

const fetchMock = vi.fn();
const sentTo = () => JSON.parse(fetchMock.mock.calls[0]![1].body as string);

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.stubEnv('CONTACT_NOTIFY_TO', 'owner@example.com');
    vi.stubEnv('RESEND_API_KEY', 're_test');
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockResolvedValue(new Response('{"id":"1"}', { status: 200 }));
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    fetchMock.mockReset();
  });

  it('emails the message through Resend, replying to the visitor, then sends them back to the form', async () => {
    const response = await post(valid);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.headers.Authorization).toBe('Bearer re_test');
    expect(sentTo()).toMatchObject({
      from: 'onboarding@resend.dev',
      to: ['owner@example.com'],
      reply_to: 'ada@example.com',
      subject: 'Contact form: Ada',
    });
    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe(`${SITE}/about?contact=sent#contact`);
  });

  it('uses EMAIL_FROM_ADDRESS once a domain is verified', async () => {
    vi.stubEnv('EMAIL_FROM_ADDRESS', 'site@andrewqin.example');
    await post(valid);
    expect(sentTo().from).toBe('site@andrewqin.example');
  });

  /** With no database, the email is the only copy: a failed send must not claim success. */
  it('tells the visitor it failed when Resend refuses, and logs why without their details', async () => {
    fetchMock.mockResolvedValue(new Response('{"message":"invalid from"}', { status: 422 }));

    const response = await post(valid);

    expect(response.headers.get('location')).toBe(`${SITE}/about?contact=error#contact`);
    const logged = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(logged).toContain('422');
    expect(logged).not.toContain('ada@example.com');
  });

  it('tells the visitor it failed when email is not set up in production', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('NODE_ENV', 'production');

    const response = await post(valid);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(response.headers.get('location')).toBe(`${SITE}/about?contact=error#contact`);
  });

  it('shows the email instead of sending it in development without a key', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});

    const response = await post(valid);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(info).toHaveBeenCalled();
    expect(response.headers.get('location')).toBe(`${SITE}/about?contact=sent#contact`);
  });

  it('tells the visitor it failed when there is no address to send to', async () => {
    vi.stubEnv('CONTACT_NOTIFY_TO', '');
    expect((await post(valid)).headers.get('location')).toBe(`${SITE}/about?contact=error#contact`);
  });

  it('sends nothing for an invalid message and asks the visitor to fix it', async () => {
    const response = await post({ ...valid, email: 'not an email' });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(response.headers.get('location')).toBe(`${SITE}/about?contact=invalid#contact`);
  });

  /** Answered like success, so bots learn nothing from probing. */
  it('drops spam silently, reporting it as sent', async () => {
    const response = await post({ ...valid, website: 'https://spam.example' });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(response.headers.get('location')).toBe(`${SITE}/about?contact=sent#contact`);
  });

  it('treats a body that is not a form as invalid, not a server error', async () => {
    const response = await POST(
      new Request(`${SITE}/api/contact`, {
        method: 'POST',
        body: '{"name":"bot"}',
        headers: { 'content-type': 'application/json', referer: `${SITE}/about` },
      }),
    );
    expect(response.status).toBe(303);
    expect(response.headers.get('location')).toBe(`${SITE}/about?contact=invalid#contact`);
  });

  it('never redirects off the site, whatever the Referer says', async () => {
    const response = await post(valid, 'https://evil.example/phish');
    expect(response.headers.get('location')).toBe(`${SITE}/?contact=sent#contact`);
  });
});
