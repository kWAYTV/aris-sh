'use client';

import { AuthCard } from '@daveyplate/better-auth-ui';

export function AuthView({ pathname }: { pathname: string }) {
  return (
    <main>
      <AuthCard pathname={pathname} redirectTo={'/'} />
    </main>
  );
}
