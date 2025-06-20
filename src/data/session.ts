import { headers } from 'next/headers';

import { auth, type Session } from '@/lib/auth';
import { getSession } from '@/lib/auth-client';

export async function getSessionServer(): Promise<Session | null> {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return null;
  }

  return session;
}

export async function getSessionClient(): Promise<Session | null> {
  const { data: session, error } = await getSession();

  if (error) {
    return null;
  }

  return session;
}
