'use server';

import { APIError } from 'better-auth/api';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/helpers/session';
import { db, inArray } from '@/lib/db';
import { user } from '@/schemas/db.schema';

export async function bulkChangeRoleAction({
  userIds,
  role
}: {
  userIds: string[];
  role: 'admin' | 'user';
}) {
  const session = await getSession();

  if (!session) {
    return { error: 'Unauthorized' };
  }

  if (session.user.role !== 'admin') {
    return { error: 'Forbidden' };
  }

  // Filter out current user
  const usersToUpdate = userIds.filter(id => id !== session.user.id);

  if (usersToUpdate.length === 0) {
    return { error: 'No users to update' };
  }

  try {
    await db.update(user).set({ role }).where(inArray(user.id, usersToUpdate));

    revalidatePath('/dashboard/admin');
    return {
      success: `${usersToUpdate.length} users updated to ${role} successfully`
    };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: 'Failed to update user roles' };
  }
}
