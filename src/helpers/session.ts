'use server';

import { headers } from 'next/headers';

import { auth, type Session, type User } from '@/lib/auth';

export const getSession = async (): Promise<Session | null> => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return null;
  }

  return session;
};

export const getUser = async (): Promise<User | null> => {
  const session = await getSession();

  if (!session || !session.user) {
    return null;
  }

  return session.user;
};
