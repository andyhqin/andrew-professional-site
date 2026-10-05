import { contactEmail, handleContactSubmission, type StoredSubmission } from '@andyhqin/contact';

import { sendEmail } from '../../../lib/email';
import { site } from '../../../lib/site';

/**
 * Where the contact form posts. The site has no database, so emailing the
 * message IS storing it: it happens in `store`, and if it fails the visitor is
 * told it failed and can try again, rather than told it was sent. See
 * @andyhqin/contact and docs/CLIENT-SITES.md in remus-external-pkg.
 */
export async function POST(request: Request): Promise<Response> {
  async function store(submission: StoredSubmission) {
    try {
      const to = process.env.CONTACT_NOTIFY_TO;
      if (!to) throw new Error('CONTACT_NOTIFY_TO is not set, so there is nowhere to send the message.');
      const email = { to, ...contactEmail(submission, site.siteName) };

      // In development, without a Resend key, show the email instead of sending it.
      if (!process.env.RESEND_API_KEY && process.env.NODE_ENV !== 'production') {
        console.info('Contact email (development, not sent):', email);
      } else {
        await sendEmail(email);
      }
      return { markEmailed: async () => {} };
    } catch (error) {
      // The handler tells the visitor it failed but keeps the reason to itself;
      // log it for the site's owner. The reason, never the visitor's details.
      console.error('Contact message not sent:', error instanceof Error ? error.message : error);
      throw error;
    }
  }

  const result = await handleContactSubmission({
    // A body that is not form-encoded (a bot's JSON post) reads as an empty
    // form, which the handler reports as invalid, rather than a 500.
    formData: await request.formData().catch(() => new FormData()),
    referer: request.headers.get('referer'),
    origin: new URL(request.url).origin,
    store,
    // Already emailed in store; there is nothing left to notify.
    notify: async () => {},
    onNotifyError: () => {},
  });

  // 303, so the browser follows with a GET and a refresh cannot resend the form.
  return Response.redirect(new URL(result.redirectTo, request.url), 303);
}
