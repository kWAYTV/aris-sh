import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import {
  admin,
  apiKey,
  captcha,
  haveIBeenPwned,
  magicLink,
  twoFactor,
  username
} from 'better-auth/plugins';

import { ChangeEmailTemplate } from '@/actions/email/emails/change-email';
import { EmailVerificationTemplate } from '@/actions/email/emails/email-verification';
import { MagicLinkTemplate } from '@/actions/email/emails/magic-link';
import { PasswordResetTemplate } from '@/actions/email/emails/password-reset';
import { sendEmailAction } from '@/actions/email/send-email.action';
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

  rateLimit: {
    enabled: true,
    window: 10, // time window in seconds
    max: 100, // max requests in the window,
    storage: 'database',
    modelName: 'rateLimit'
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
    requireEmailVerification: true,

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
      clientId: env.TWITTER_CLIENT_ID as string,
      clientSecret: env.TWITTER_CLIENT_SECRET as string
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string
    }
  },

  plugins: [
    admin(),

    apiKey({
      enableMetadata: true
    }),

    captcha({
      provider: 'cloudflare-turnstile',
      secretKey: env.TURNSTILE_SECRET_KEY!
    }),

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
    }),

    haveIBeenPwned({
      customPasswordCompromisedMessage: 'Please choose a more secure password.'
    }),

    nextCookies()
  ]
});

export type Session = typeof auth.$Infer.Session;
export type User = Session['user'];
