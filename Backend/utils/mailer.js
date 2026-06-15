const nodemailer = require('nodemailer');

const MILES_BRAND_COLOR = '#1d9e75';
const MILES_BRAND_DARK = '#0f6f51';

const getFromAddress = () =>
  process.env.GMAIL_USER || process.env.OFFICIAL_MILES_EMAIL || '';

const isMailerConfigured = () =>
  Boolean(
    (process.env.GMAIL_USER || process.env.OFFICIAL_MILES_EMAIL) &&
      process.env.GMAIL_APP_PASSWORD
  );

let cachedTransporter = null;
const getTransporter = () => {
  if (!isMailerConfigured()) return null;
  if (cachedTransporter) return cachedTransporter;
  cachedTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: getFromAddress(),
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  return cachedTransporter;
};

const sendMail = async ({ to, subject, html, text, replyTo }) => {
  const transporter = getTransporter();
  if (!transporter) {
    const error = new Error('Mailer is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.');
    error.code = 'MAILER_NOT_CONFIGURED';
    throw error;
  }

  const fromAddress = getFromAddress();
  return transporter.sendMail({
    from: `"MILES Project" <${fromAddress}>`,
    to,
    subject,
    html: html || undefined,
    text: text || undefined,
    replyTo: replyTo || fromAddress,
  });
};

const wrapEmail = ({ heading, intro, bodyHtml, ctaLabel, ctaUrl, footerNote }) => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7f5; padding: 32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 6px 22px rgba(15, 111, 81, 0.08);">
      <tr>
        <td style="background: linear-gradient(135deg, ${MILES_BRAND_COLOR} 0%, ${MILES_BRAND_DARK} 100%); color: #ffffff; padding: 28px 32px;">
          <div style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.85;">MILES Project</div>
          <h1 style="margin: 8px 0 0; font-size: 22px; line-height: 1.3;">${heading}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 28px 32px; color: #1f2a37; font-size: 15px; line-height: 1.65;">
          ${intro ? `<p style="margin: 0 0 16px;">${intro}</p>` : ''}
          ${bodyHtml || ''}
          ${
            ctaLabel && ctaUrl
              ? `<p style="margin: 24px 0 8px;"><a href="${ctaUrl}" style="display: inline-block; background: ${MILES_BRAND_COLOR}; color: #ffffff; text-decoration: none; padding: 12px 22px; border-radius: 999px; font-weight: 600;">${ctaLabel}</a></p>`
              : ''
          }
        </td>
      </tr>
      <tr>
        <td style="background: #f4f7f5; padding: 18px 32px; color: #5b6b76; font-size: 12px; line-height: 1.55;">
          ${footerNote || ''}
          <p style="margin: 8px 0 0;">Mothers in Learning Empowerment Support (MILES) &middot; Kakuma, Kenya</p>
          <p style="margin: 4px 0 0;">You are receiving this email because you subscribed at the MILES website.</p>
        </td>
      </tr>
    </table>
  </div>
`;

const sendAdminCreatedEmail = async ({ adminEmail, adminName, adminUsername }) => {
  const html = wrapEmail({
    heading: 'New Admin Account Created',
    intro: 'A new administrator account has been created on the MILES platform.',
    bodyHtml: `
      <div style="background: #f4f7f5; border-radius: 10px; padding: 16px 18px;">
        <p style="margin: 0 0 6px;"><strong>Name:</strong> ${adminName}</p>
        <p style="margin: 0 0 6px;"><strong>Username:</strong> ${adminUsername}</p>
        <p style="margin: 0 0 6px;"><strong>Email:</strong> ${adminEmail}</p>
        <p style="margin: 0;"><strong>Created:</strong> ${new Date().toLocaleString()}</p>
      </div>
      <p style="margin: 18px 0 0;">If you did not authorize this action, please secure your account immediately.</p>
    `,
    footerNote: '<p style="margin: 0;">This is an automated security notification.</p>',
  });

  return sendMail({ to: adminEmail, subject: 'MILES: New Admin Account Created', html });
};

const sendPasswordChangedEmail = async ({ adminEmail, adminName }) => {
  const html = wrapEmail({
    heading: 'Your Password Was Changed',
    intro: `Hello ${adminName || 'Admin'}, your MILES admin account password has just been updated.`,
    bodyHtml: `
      <div style="background: #f4f7f5; border-radius: 10px; padding: 16px 18px;">
        <p style="margin: 0 0 6px;"><strong>Account:</strong> ${adminEmail}</p>
        <p style="margin: 0;"><strong>Changed at:</strong> ${new Date().toLocaleString()}</p>
      </div>
      <p style="margin: 18px 0 0;">If you did not make this change, reset your password again immediately and contact the MILES technical lead.</p>
    `,
    footerNote: '<p style="margin: 0;">This is an automated security notification.</p>',
  });

  return sendMail({ to: adminEmail, subject: 'MILES: Password Changed', html });
};

const sendPasswordResetCodeEmail = async ({ adminEmail, adminName, resetCode, expiresInMinutes = 15 }) => {
  const html = wrapEmail({
    heading: 'Your Password Reset Code',
    intro: `Hello ${adminName || 'Admin'}, use the code below to finish resetting your MILES admin password.`,
    bodyHtml: `
      <div style="background: #f4f7f5; border-radius: 10px; padding: 20px; text-align: center;">
        <div style="font-size: 12px; letter-spacing: 0.2em; color: ${MILES_BRAND_DARK}; text-transform: uppercase; margin-bottom: 8px;">Verification code</div>
        <div style="font-size: 34px; font-weight: 700; letter-spacing: 8px; color: #0f172a;">${resetCode}</div>
      </div>
      <p style="margin: 18px 0 0;">This code expires in <strong>${expiresInMinutes} minutes</strong>. If you did not request a reset, you can safely ignore this email.</p>
    `,
    footerNote: '<p style="margin: 0;">For your security, never share this code with anyone.</p>',
  });

  return sendMail({ to: adminEmail, subject: 'MILES: Password Reset Code', html });
};

const sendSubscriberWelcomeEmail = async ({ to }) => {
  const html = wrapEmail({
    heading: 'Welcome to the MILES community!',
    intro:
      'Thank you for subscribing. We are so glad to have you walking alongside us as we empower young mothers and youth in Kakuma through education, mentorship, and opportunity.',
    bodyHtml: `
      <p style="margin: 0 0 12px;"><strong>A little about us</strong></p>
      <p style="margin: 0 0 16px;">
        MILES (Mothers in Learning Empowerment Support) is a community-led initiative that breaks down the
        economic and social barriers facing young mothers and youth. We focus on practical mentorship,
        digital literacy, education pathways, and dignity-restoring support.
      </p>
      <p style="margin: 0 0 12px;"><strong>How to reach us</strong></p>
      <ul style="margin: 0 0 16px; padding-left: 20px;">
        <li>Email: <a href="mailto:${getFromAddress()}" style="color: ${MILES_BRAND_DARK};">${getFromAddress()}</a></li>
        <li>Reply to this email and a real human from our team will respond.</li>
        <li>Visit our website to read stories, browse projects, and see upcoming workshops.</li>
      </ul>
      <p style="margin: 0 0 12px;"><strong>What to expect from us</strong></p>
      <p style="margin: 0;">
        We will keep you updated on upcoming workshops, programmes, and invitations &mdash; never spam,
        only what we genuinely think will be useful or inspiring to you.
      </p>
    `,
    footerNote:
      '<p style="margin: 0;">If you did not subscribe, just reply with "remove me" and we will take you off the list.</p>',
  });

  return sendMail({
    to,
    subject: 'Welcome to MILES \u2013 thank you for subscribing',
    html,
  });
};

const sendSubscriberInvitationEmail = async ({
  to,
  subject,
  message,
  programTitle,
  programDate,
  programLocation,
}) => {
  const detailRows = [];
  if (programTitle) detailRows.push(`<p style="margin: 0 0 6px;"><strong>Programme:</strong> ${programTitle}</p>`);
  if (programDate) detailRows.push(`<p style="margin: 0 0 6px;"><strong>When:</strong> ${programDate}</p>`);
  if (programLocation) detailRows.push(`<p style="margin: 0;"><strong>Where:</strong> ${programLocation}</p>`);

  const detailBlock = detailRows.length
    ? `<div style="background: #f4f7f5; border-radius: 10px; padding: 16px 18px; margin: 0 0 18px;">${detailRows.join('')}</div>`
    : '';

  const messageHtml = String(message || '')
    .split(/\n{2,}/)
    .map((paragraph) => `<p style="margin: 0 0 14px;">${paragraph.replace(/\n/g, '<br />')}</p>`)
    .join('');

  const html = wrapEmail({
    heading: subject || 'A MILES update for you',
    intro: 'You are invited to an upcoming MILES activity. Here are the details:',
    bodyHtml: `${detailBlock}${messageHtml}`,
    footerNote:
      '<p style="margin: 0;">Reply to this email if you would like to RSVP or have questions for our team.</p>',
  });

  return sendMail({
    to,
    subject: subject || 'A MILES programme update for you',
    html,
  });
};

module.exports = {
  sendMail,
  sendAdminCreatedEmail,
  sendPasswordChangedEmail,
  sendPasswordResetCodeEmail,
  sendSubscriberWelcomeEmail,
  sendSubscriberInvitationEmail,
  isMailerConfigured,
};
