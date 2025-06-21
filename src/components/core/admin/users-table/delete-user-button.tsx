'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { deleteUser } from '@/helpers/admin-actions';

interface DeleteUserButtonProps {
  userId: string;
  onDelete?: () => void;
}

export function DeleteUserButton({ userId, onDelete }: DeleteUserButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUser(userId);
      toast.success('User deleted successfully');
      onDelete?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete user'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant='destructive'
      size='sm'
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className='h-4 w-4' />
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
  );
}

export const PlaceholderDeleteUserButton = () => {
  return (
    <Button
      size='icon'
      variant='destructive'
      className='size-7 rounded-sm'
      disabled
    >
      <span className='sr-only'>Delete User</span>
      <Trash2 className='h-4 w-4' />
    </Button>
  );
};
