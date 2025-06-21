'use client';

import { Suspense, useState } from 'react';
import { toast } from 'sonner';

import { UsersDataTable } from '@/components/core/admin/users-table/users-data-table';
import { columns } from '@/components/core/admin/users-table/users-table-columns';
import { UsersTableSkeleton } from '@/components/core/admin/users-table/users-table-skeleton';
import { type User } from '@/lib/auth';

interface AdminDashboardClientProps {
  users: User[];
}

export function AdminDashboardClient({ users }: AdminDashboardClientProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleBulkDelete(userIds: string[]) {
    setIsLoading(true);
    try {
      const { bulkDeleteUsers } = await import('@/helpers/admin-actions');
      await bulkDeleteUsers(userIds);
      toast.success(`${userIds.length} user(s) deleted successfully`);
      window.location.reload();
    } catch {
      toast.error('Failed to delete users');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleBulkRoleChange(
    userIds: string[],
    role: 'admin' | 'user'
  ) {
    setIsLoading(true);
    try {
      const { bulkSetUserRole } = await import('@/helpers/admin-actions');
      await bulkSetUserRole(userIds, role);
      toast.success(
        `${userIds.length} user(s) updated to ${role} successfully`
      );
      window.location.reload();
    } catch {
      toast.error('Failed to update user roles');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleBulkBan(userIds: string[]) {
    setIsLoading(true);
    try {
      const { bulkBanUsers } = await import('@/helpers/admin-actions');
      await bulkBanUsers(userIds);
      toast.success(`${userIds.length} user(s) banned successfully`);
      window.location.reload();
    } catch {
      toast.error('Failed to ban users');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleBulkUnban(userIds: string[]) {
    setIsLoading(true);
    try {
      const { bulkUnbanUsers } = await import('@/helpers/admin-actions');
      await bulkUnbanUsers(userIds);
      toast.success(`${userIds.length} user(s) unbanned successfully`);
      window.location.reload();
    } catch {
      toast.error('Failed to unban users');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  return (
    <Suspense fallback={<UsersTableSkeleton />}>
      <UsersDataTable
        columns={columns}
        data={users}
        onBulkDelete={handleBulkDelete}
        onBulkRoleChange={handleBulkRoleChange}
        onBulkBan={handleBulkBan}
        onBulkUnban={handleBulkUnban}
      />
    </Suspense>
  );
}
