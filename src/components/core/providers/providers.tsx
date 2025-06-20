'use client';

import { AuthUIProvider } from '@daveyplate/better-auth-ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { env } from '@/env';
import { authClient } from '@/lib/auth-client';
import { getBaseUrl } from '@/lib/utils';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      baseURL={getBaseUrl()}
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      Link={Link}
      credentials={{
        username: true,
        confirmPassword: true
      }}
      social={{
        providers: ['twitter', 'github']
      }}
      captcha={{
        provider: 'cloudflare-turnstile',
        siteKey: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      }}
      apiKey={{
        prefix: 'aris_',
        metadata: {
          environment: process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
        }
      }}
      twoFactor={['totp']}
      emailVerification
      avatar
      magicLink
      multiSession
      deleteUser
    >
      {children}
      <Toaster richColors />
    </AuthUIProvider>
  );
}
