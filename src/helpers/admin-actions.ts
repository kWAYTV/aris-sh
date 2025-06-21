import { admin } from '@/lib/auth-client';

export async function bulkBanUsers(userIds: string[]) {
  if (!userIds || userIds.length === 0) {
    throw new Error('No user IDs provided for banning');
  }

  try {
    const promises = userIds.map(async userId => {
      try {
        await admin.banUser({
          userId,
          banReason: 'Banned by admin'
        });
        return { userId, success: true };
      } catch (error) {
        console.error(`Failed to ban user ${userId}:`, error);
        return { userId, success: false, error };
      }
    });

    const results = await Promise.all(promises);
    const failures = results.filter(result => !result.success);

    if (failures.length > 0) {
      const failedUserIds = failures.map(f => f.userId).join(', ');
      throw new Error(
        `Failed to ban ${failures.length} user(s): ${failedUserIds}`
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unexpected error occurred while banning users');
  }
}

export async function bulkUnbanUsers(userIds: string[]) {
  if (!userIds || userIds.length === 0) {
    throw new Error('No user IDs provided for unbanning');
  }

  try {
    const promises = userIds.map(async userId => {
      try {
        await admin.unbanUser({ userId });
        return { userId, success: true };
      } catch (error) {
        console.error(`Failed to unban user ${userId}:`, error);
        return { userId, success: false, error };
      }
    });

    const results = await Promise.all(promises);
    const failures = results.filter(result => !result.success);

    if (failures.length > 0) {
      const failedUserIds = failures.map(f => f.userId).join(', ');
      throw new Error(
        `Failed to unban ${failures.length} user(s): ${failedUserIds}`
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unexpected error occurred while unbanning users');
  }
}

// User Management Functions
export async function deleteUser(userId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    await admin.removeUser({ userId });
  } catch (error) {
    console.error(`Failed to delete user ${userId}:`, error);
    throw new Error('Failed to delete user');
  }
}
