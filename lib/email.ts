/**
 * Sends one email through Resend's API. Plain fetch, no SDK: one call is all
 * the site makes. Throws on any failure, so the contact route can tell the
 * visitor their message did not go through.
 */
export async function sendEmail(message: { to: string; subject: string; text: string; replyTo: string }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set, so the message cannot be sent.');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // Without a domain of your own, Resend's shared sender can only email the
      // address the Resend account was created with. See .env.example.
      from: process.env.EMAIL_FROM_ADDRESS || 'onboarding@resend.dev',
      to: [message.to],
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend refused the email: ${response.status} ${await response.text()}`);
  }
}
