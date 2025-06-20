import { EmailTemplate } from '@daveyplate/better-auth-ui/server';

interface PasswordResetProps {
  userName: string;
  resetUrl: string;
}

export function PasswordResetTemplate({
  userName,
  resetUrl
}: PasswordResetProps) {
  return EmailTemplate({
    action: 'Reset Password',
    content: (
      <>
        <p>Hello {userName},</p>
        <p>
          We received a request to reset your password for your aris.sh account.
          Click the button below to create a new password.
        </p>
        <p>
          If you didn&apos;t request a password reset, you can safely ignore
          this email. Your password will remain unchanged.
        </p>
        <p>
          <strong>
            This link will expire in 24 hours for security reasons.
          </strong>
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          If the button above doesn&apos;t work, copy and paste this link into
          your browser:
          <br />
          <a
            href={resetUrl}
            style={{ color: '#0066cc', wordBreak: 'break-all' }}
          >
            {resetUrl}
          </a>
        </p>
      </>
    ),
    heading: 'Reset Your Password',
    siteName: 'aris.sh',
    baseUrl: process.env.BETTER_AUTH_URL,
    url: resetUrl,
    preview: 'Reset your password for your aris.sh account',
    imageUrl: 'https://aris.sh/og.png'
  });
}
