import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { sendEmailAction } from '@/actions/email/send-email.action';
import { EmailVerificationTemplate } from '@/components/emails/email-verification';
import { PasswordResetTemplate } from '@/components/emails/password-reset';
/* import { haveIBeenPwned } from 'better-auth/plugins'; */
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

  user: {
    deleteUser: {
      enabled: true
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
      const userName = user.name || user.email.split('@')[0];

      await sendEmailAction({
        to: user.email,
        subject: 'Reset your password - aris.sh',
        react: PasswordResetTemplate({
          userName,
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

  plugins: [
    /* haveIBeenPwned({
      customPasswordCompromisedMessage: 'Please choose a more secure password.'
    }) */
  ]
});
