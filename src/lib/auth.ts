import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink, twoFactor, username } from 'better-auth/plugins';

/* import { haveIBeenPwned } from 'better-auth/plugins'; */
import { sendEmailAction } from '@/actions/email/send-email.action';
import { ChangeEmailTemplate } from '@/components/emails/change-email';
import { EmailVerificationTemplate } from '@/components/emails/email-verification';
import { MagicLinkTemplate } from '@/components/emails/magic-link';
import { PasswordResetTemplate } from '@/components/emails/password-reset';
import { env } from '@/env';
import { db } from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/hash';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg'
  }),

  appName: 'arisdotsh',
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.BETTER_AUTH_URL || 'http://localhost:3000'],

  account: {
    accountLinking: {
      enabled: true
    }
  },

  user: {
    deleteUser: {
      enabled: true
    },
    changeEmail: {
      enabled: true,

      sendChangeEmailVerification: async ({ newEmail, url, user }) => {
        await sendEmailAction({
          to: newEmail,
          subject: 'Verify your new email address - aris.sh',
          react: ChangeEmailTemplate({
            userName: user.name,
            verificationUrl: String(url),
            newEmail
          })
        });
      }
    }
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,

    password: {
      hash: hashPassword,
      verify: verifyPassword
    },

    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: 'Reset your password - aris.sh',
        react: PasswordResetTemplate({
          userName: user.name,
          resetUrl: String(url)
        })
      });
    }
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: 'Verify your email address - aris.sh',
        react: EmailVerificationTemplate({
          userName: user.name,
          verificationUrl: String(url)
        })
      });
    }
  },

  socialProviders: {
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string
    }
  },

  plugins: [
    username({
      minUsernameLength: 3,
      maxUsernameLength: 12
    }),

    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendEmailAction({
          to: email,
          subject: 'Sign in to aris.sh - Magic Link',
          react: MagicLinkTemplate({
            userName: email.split('@')[0],
            magicLinkUrl: String(url)
          })
        });
      }
    }),

    twoFactor({
      issuer: 'arisdotsh'
    })

    /* haveIBeenPwned({
      customPasswordCompromisedMessage: 'Please choose a more secure password.'
    }) */
  ]
});
