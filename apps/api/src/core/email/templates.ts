function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function layout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#0b0b1a;font-family:Inter,system-ui,-apple-system,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b1a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" maxwidth="520" cellpadding="0" cellspacing="0" style="max-width:520px;background:#12122a;border-radius:16px;border:1px solid #2a2a4a;overflow:hidden;">
          <tr>
            <td style="padding:32px 32px 8px 32px;">
              <p style="margin:0;color:#7C3AED;font-size:18px;font-weight:700;letter-spacing:0.5px;">Nexus Links</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 32px 32px;color:#e2e2f0;font-size:15px;line-height:1.6;">
              ${content}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export interface VerificationTemplateData {
  url: string
  name: string
}

export interface PasswordResetTemplateData {
  url: string
  name: string
}

export interface InviteTemplateData {
  url: string
  inviterName: string
  organizationName: string
}

function button(url: string, label: string): string {
  return `<p style="margin:28px 0;">
    <a href="${escapeHtml(url)}" style="display:inline-block;background:#7C3AED;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:14px;">${escapeHtml(label)}</a>
  </p>`
}

export function renderVerificationEmail(data: VerificationTemplateData) {
  const subject = 'Verify your email — Nexus Links'
  const text = `Hi ${data.name},\n\nPlease verify your email address by visiting: ${data.url}\n\nIf you did not create this account, you can safely ignore this email.`
  const html = layout(`
    <p style="margin:0 0 16px 0;">Hi ${escapeHtml(data.name)},</p>
    <p style="margin:0 0 8px 0;">Welcome to Nexus Links. Please confirm your email address to activate your account.</p>
    ${button(data.url, 'Verify email')}
    <p style="margin:0;color:#8a8aa8;font-size:13px;">If the button does not work, copy and paste this link into your browser:<br/>${escapeHtml(data.url)}</p>
  `)
  return { subject, text, html }
}

export function renderPasswordResetEmail(data: PasswordResetTemplateData) {
  const subject = 'Reset your password — Nexus Links'
  const text = `Hi ${data.name},\n\nWe received a request to reset your password. Visit: ${data.url}\n\nThis link expires in 30 minutes. If you did not request this, you can safely ignore this email.`
  const html = layout(`
    <p style="margin:0 0 16px 0;">Hi ${escapeHtml(data.name)},</p>
    <p style="margin:0 0 8px 0;">We received a request to reset your password. The link below is valid for 30 minutes.</p>
    ${button(data.url, 'Reset password')}
    <p style="margin:0;color:#8a8aa8;font-size:13px;">If the button does not work, copy and paste this link into your browser:<br/>${escapeHtml(data.url)}</p>
  `)
  return { subject, text, html }
}

export function renderInviteEmail(data: InviteTemplateData) {
  const subject = `You've been invited to ${data.organizationName} on Nexus Links`
  const text = `${data.inviterName} invited you to join ${data.organizationName} on Nexus Links.\n\nAccept the invite: ${data.url}`
  const html = layout(`
    <p style="margin:0 0 16px 0;">Hi there,</p>
    <p style="margin:0 0 8px 0;">${escapeHtml(data.inviterName)} invited you to join <strong>${escapeHtml(data.organizationName)}</strong> on Nexus Links.</p>
    ${button(data.url, 'Accept invite')}
  `)
  return { subject, text, html }
}
