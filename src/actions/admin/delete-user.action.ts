'use server';

import { APIError } from 'better-auth/api';
import { and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/data/session';
import { db, eq } from '@/lib/db';
import { user } from '@/schemas/db.schema';
import { UserRole } from '@/schemas/db.schema';

export async function deleteUserAction({ userId }: { userId: string }) {
  const session = await getSession();

  if (!session) throw new Error('Unauthorized');

  if (session.user.role !== UserRole.ADMIN) {
    throw new Error('Forbidden');
  }

  if (session.user.id === userId) {
    throw new Error('Cannot delete your own account from admin panel');
  }

  try {
    const result = await db
      .delete(user)
      .where(and(eq(user.id, userId), eq(user.role, UserRole.USER)));

    if (result.length === 0) {
      throw new Error('User not found or cannot delete non-user accounts');
    }

    revalidatePath('/dashboard/admin');
    return { success: true };
  } catch (err) {
    if (err instanceof APIError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: 'Internal Server Error' };
  }
}
