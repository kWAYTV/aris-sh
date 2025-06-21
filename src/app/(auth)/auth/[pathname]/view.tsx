'use client';

import { AuthCard } from '@daveyplate/better-auth-ui';

export function AuthView({ pathname }: { pathname: string }) {
  return (
    <main className='flex h-full items-center justify-center p-4'>
      <AuthCard pathname={pathname} redirectTo={'/'} />
    </main>
  );
}
