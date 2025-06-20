import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

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
    }
  },

  plugins: [
    /* haveIBeenPwned({
      customPasswordCompromisedMessage: 'Please choose a more secure password.'
    }) */
  ]
});
