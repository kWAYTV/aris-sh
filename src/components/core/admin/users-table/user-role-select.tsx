'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { userRoles } from '@/schemas/db.schema';

type UserRole = (typeof userRoles.enumValues)[number];

interface UserRoleSelectProps {
  userId: string;
  role: UserRole;
}

export const UserRoleSelect = ({ userId, role }: UserRoleSelectProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleChange(newRole: string) {
    /* const canChangeRole = await admin.hasPermission({
      permissions: {
        user: ['set-role']
      }
    });

    if (!canChangeRole.error) {
      return toast.error('Forbidden');
    } */

    setIsPending(true);
    try {
      const { setUserRole } = await import('@/helpers/admin-actions');
      await setUserRole(userId, newRole as UserRole);
      toast.success('User role updated');
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update user role';
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className='flex justify-center'>
      <Select
        value={role}
        onValueChange={handleChange}
        disabled={role === 'admin' || isPending}
      >
        <SelectTrigger className='w-[120px]'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {userRoles.enumValues.map(roleValue => (
            <SelectItem key={roleValue} value={roleValue}>
              {roleValue.charAt(0).toUpperCase() + roleValue.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
