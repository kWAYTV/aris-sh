import { EmailTemplate } from '@daveyplate/better-auth-ui/server';

interface MagicLinkProps {
  userName: string;
  magicLinkUrl: string;
}

export function MagicLinkTemplate({ userName, magicLinkUrl }: MagicLinkProps) {
  return EmailTemplate({
    action: 'Sign In',
    content: (
      <>
        <p>Hello {userName},</p>
        <p>
          We received a request to sign in to your aris.sh account. Click the
          button below to sign in securely without a password.
        </p>
        <p>
          If you didn&apos;t request this sign-in link, you can safely ignore
          this email.
        </p>
        <p>
          <strong>
            This link will expire in 10 minutes for security reasons.
          </strong>
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          If the button above doesn&apos;t work, copy and paste this link into
          your browser:
          <br />
          <a
            href={magicLinkUrl}
            style={{ color: '#0066cc', wordBreak: 'break-all' }}
          >
            {magicLinkUrl}
          </a>
        </p>
      </>
    ),
    heading: 'Sign In to aris.sh',
    siteName: 'aris.sh',
    baseUrl: process.env.BETTER_AUTH_URL,
    url: magicLinkUrl,
    preview: 'Your secure sign-in link for aris.sh',
    imageUrl: 'https://aris.sh/og.png'
  });
}
