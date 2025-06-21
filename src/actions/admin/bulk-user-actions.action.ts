'use server';

import { APIError } from 'better-auth/api';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/data/session';
import { and, db, eq, inArray } from '@/lib/db';
import { user } from '@/schemas/db.schema';

export async function bulkDeleteUsersAction({
  userIds
}: {
  userIds: string[];
}) {
  const session = await getSession();

  if (!session) {
    return { error: 'Unauthorized' };
  }

  if (session.user.role !== 'admin') {
    return { error: 'Forbidden' };
  }

  // Filter out current user
  const usersToDelete = userIds.filter(id => id !== session.user.id);

  if (usersToDelete.length === 0) {
    return { error: 'No users to delete' };
  }

  try {
    await db.delete(user).where(
      and(
        inArray(user.id, usersToDelete),
        eq(user.role, 'user') // Only allow deleting regular users
      )
    );

    revalidatePath('/dashboard/admin');
    return { success: `${usersToDelete.length} users deleted successfully` };
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message };
    }
    return { error: 'Failed to delete users' };
  }
}

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
