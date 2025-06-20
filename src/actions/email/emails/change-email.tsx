import { EmailTemplate } from '@daveyplate/better-auth-ui/server';

interface ChangeEmailProps {
  userName: string;
  verificationUrl: string;
  newEmail: string;
}

export function ChangeEmailTemplate({
  userName,
  verificationUrl,
  newEmail
}: ChangeEmailProps) {
  return EmailTemplate({
    action: 'Verify New Email',
    content: (
      <>
        <p>Hello {userName},</p>
        <p>
          We received a request to change your email address to{' '}
          <strong>{newEmail}</strong>. Please click the button below to verify
          this new email address.
        </p>
        <p>
          If you didn&apos;t request this email change, please contact our
          support team immediately.
        </p>
        <p>
          <strong>This verification link will expire in 24 hours.</strong>
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          If the button above doesn&apos;t work, copy and paste this link into
          your browser:
          <br />
          <a
            href={verificationUrl}
            style={{ color: '#0066cc', wordBreak: 'break-all' }}
          >
            {verificationUrl}
          </a>
        </p>
      </>
    ),
    heading: 'Verify Your New Email Address',
    siteName: 'aris.sh',
    baseUrl: process.env.CORS_ORIGIN,
    url: verificationUrl,
    preview: 'Verify your new email address for aris.sh',
    imageUrl: 'https://aris.sh/og.png'
  });
}
