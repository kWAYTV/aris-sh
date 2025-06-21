'use server';

import { APIError } from 'better-auth/api';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { db, eq } from '@/lib/db';
import { user } from '@/schemas/db.schema';

export async function deleteUserAction({ userId }: { userId: string }) {
  const _headers = await headers();

  const session = await auth.api.getSession({
    headers: _headers
  });

  if (!session) throw new Error('Unauthorized');

  if (session.user.role !== 'admin') {
    throw new Error('Forbidden');
  }

  if (session.user.id === userId) {
    throw new Error('Cannot delete your own account from admin panel');
  }

  try {
    await db.delete(user).where(eq(user.id, userId));

    revalidatePath('/dashboard/admin');
    return { success: true, error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: 'Internal Server Error' };
  }
}
