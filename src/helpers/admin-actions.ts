import { admin } from '@/lib/auth-client';

// =============================================================================
// SINGLE USER ACTIONS
// =============================================================================

/**
 * Ban a single user
 * @param userId - The ID of the user to ban
 * @param banReason - The reason for banning the user (optional)
 */
export async function banUser(userId: string, banReason = 'Banned by admin') {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    await admin.banUser({
      userId,
      banReason
    });
  } catch (error) {
    console.error(`Failed to ban user ${userId}:`, error);
    throw new Error('Failed to ban user');
  }
}

/**
 * Unban a single user
 * @param userId - The ID of the user to unban
 */
export async function unbanUser(userId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    await admin.unbanUser({ userId });
  } catch (error) {
    console.error(`Failed to unban user ${userId}:`, error);
    throw new Error('Failed to unban user');
  }
}

/**
 * Change a single user's role
 * @param userId - The ID of the user to update
 * @param role - The new role to assign to the user
 */
export async function setUserRole(userId: string, role: 'admin' | 'user') {
  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!role) {
    throw new Error('Role is required');
  }

  try {
    await admin.setRole({
      userId,
      role
    });
  } catch (error) {
    console.error(`Failed to set user role ${userId}:`, error);
    throw new Error('Failed to set user role');
  }
}

/**
 * Delete a single user
 * @param userId - The ID of the user to delete
 */
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

// =============================================================================
// BULK USER ACTIONS
// =============================================================================

/**
 * Ban multiple users
 * @param userIds - Array of user IDs to ban
 */
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

/**
 * Unban multiple users
 * @param userIds - Array of user IDs to unban
 */
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

/**
 * Change role for multiple users
 * @param userIds - Array of user IDs to update
 * @param role - The new role to assign to all users
 */
export async function bulkSetUserRole(
  userIds: string[],
  role: 'admin' | 'user'
) {
  if (!userIds || userIds.length === 0) {
    throw new Error('No user IDs provided for role change');
  }

  if (!role) {
    throw new Error('Role is required');
  }

  try {
    const promises = userIds.map(async userId => {
      try {
        await admin.setRole({ userId, role });
        return { userId, success: true };
      } catch (error) {
        console.error(`Failed to set role for user ${userId}:`, error);
        return { userId, success: false, error };
      }
    });

    const results = await Promise.all(promises);
    const failures = results.filter(result => !result.success);

    if (failures.length > 0) {
      const failedUserIds = failures.map(f => f.userId).join(', ');
      throw new Error(
        `Failed to change role for ${failures.length} user(s): ${failedUserIds}`
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unexpected error occurred while changing user roles');
  }
}

/**
 * Delete multiple users
 * @param userIds - Array of user IDs to delete
 */
export async function bulkDeleteUsers(userIds: string[]) {
  if (!userIds || userIds.length === 0) {
    throw new Error('No user IDs provided for deletion');
  }

  try {
    const promises = userIds.map(async userId => {
      try {
        await admin.removeUser({ userId });
        return { userId, success: true };
      } catch (error) {
        console.error(`Failed to delete user ${userId}:`, error);
        return { userId, success: false, error };
      }
    });

    const results = await Promise.all(promises);
    const failures = results.filter(result => !result.success);

    if (failures.length > 0) {
      const failedUserIds = failures.map(f => f.userId).join(', ');
      throw new Error(
        `Failed to delete ${failures.length} user(s): ${failedUserIds}`
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unexpected error occurred while deleting users');
  }
}
