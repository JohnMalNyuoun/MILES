const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || process.env.OFFICIAL_MILES_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendMail = async ({ to, subject, html, text }) => {
  const from = `"MILES Admin" <${process.env.GMAIL_USER || process.env.OFFICIAL_MILES_EMAIL}>`;

  const mailOptions = {
    from,
    to,
    subject,
    html: html || undefined,
    text: text || undefined,
  };

  return transporter.sendMail(mailOptions);
};

const sendAdminCreatedEmail = async ({ adminEmail, adminName, adminUsername }) => {
  const subject = 'MILES: New Admin Account Created';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2196F3;">New Admin Account Created</h2>
      <p>Hello,</p>
      <p>A new administrator account has been created on the MILES platform.</p>
      <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p><strong>Name:</strong> ${adminName}</p>
        <p><strong>Username:</strong> ${adminUsername}</p>
        <p><strong>Email:</strong> ${adminEmail}</p>
        <p><strong>Created:</strong> ${new Date().toLocaleString()}</p>
      </div>
      <p>If you did not authorize this action, please secure your account immediately.</p>
      <p style="color: #666; font-size: 12px;">— MILES Administration System</p>
    </div>
  `;

  return sendMail({ to: adminEmail, subject, html });
};

const sendPasswordChangedEmail = async ({ adminEmail, adminName }) => {
  const subject = 'MILES: Admin Password Changed';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #FF9800;">Password Changed Successfully</h2>
      <p>Hello ${adminName},</p>
      <p>Your MILES admin account password has been changed successfully.</p>
      <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p><strong>Account:</strong> ${adminEmail}</p>
        <p><strong>Changed At:</strong> ${new Date().toLocaleString()}</p>
      </div>
      <p>If you did not make this change, please contact the system administrator immediately or use the password reset feature to regain access.</p>
      <p style="color: #666; font-size: 12px;">— MILES Administration System</p>
    </div>
  `;

  return sendMail({ to: adminEmail, subject, html });
};

const sendPasswordResetCodeEmail = async ({ adminEmail, adminName, resetCode }) => {
  const subject = 'MILES: Password Reset Code';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #4CAF50;">Password Reset Request</h2>
      <p>Hello ${adminName},</p>
      <p>You requested a password reset for your MILES admin account.</p>
      <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
        <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Your reset code:</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #333; margin: 0;">${resetCode}</p>
      </div>
      <p><strong>This code expires in 15 minutes.</strong></p>
      <p>If you did not request this reset, you can safely ignore this email.</p>
      <p style="color: #666; font-size: 12px;">— MILES Administration System</p>
    </div>
  `;

  return sendMail({ to: adminEmail, subject, html });
};

module.exports = {
  sendMail,
  sendAdminCreatedEmail,
  sendPasswordChangedEmail,
  sendPasswordResetCodeEmail,
};
