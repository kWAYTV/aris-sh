'use client';

import { Suspense, useState } from 'react';
import { toast } from 'sonner';

import {
  bulkChangeRoleAction,
  bulkDeleteUsersAction
} from '@/actions/admin/bulk-user-actions.action';
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
      const result = await bulkDeleteUsersAction({ userIds });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
      }
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
      const result = await bulkChangeRoleAction({ userIds, role });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
      }
    } catch {
      toast.error('Failed to update user roles');
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
      />
    </Suspense>
  );
}
