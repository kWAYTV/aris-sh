'use server';

import { APIError } from 'better-auth/api';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/data/session';
import { and, db, eq } from '@/lib/db';
import { user } from '@/schemas/db.schema';

export async function deleteUserAction({ userId }: { userId: string }) {
  const session = await getSession();

  if (!session) throw new Error('Unauthorized');

  if (session.user.role !== 'admin') {
    throw new Error('Forbidden');
  }

  if (session.user.id === userId) {
    throw new Error('Cannot delete your own account from admin panel');
  }

  try {
    await db
      .delete(user)
      .where(and(eq(user.id, userId), eq(user.role, 'user')));

    revalidatePath('/dashboard/admin');
    return { success: true, error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: 'Internal Server Error' };
  }
}
