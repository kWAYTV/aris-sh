'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import {
  Copy,
  Eye,
  Mail,
  MoreHorizontal,
  Shield,
  ShieldOff,
  Trash2
} from 'lucide-react';

import { DataTableColumnHeader } from '@/components/core/admin/users-table/data-table-column-header';
import { UserRoleSelect } from '@/components/core/admin/users-table/user-role-select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { type User } from '@/lib/auth';

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => (
      <div className='font-mono text-xs'>
        {row.getValue<string>('id').slice(0, 8)}
      </div>
    )
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const name = row.getValue<string>('name');
      return <div className='font-medium'>{name}</div>;
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => {
      const email = row.getValue<string>('email');
      const emailVerified = row.original.emailVerified;
      return (
        <div className='flex items-center gap-2'>
          <span className='lowercase'>{email}</span>
          {!emailVerified && (
            <Badge variant='secondary' className='text-xs'>
              Unverified
            </Badge>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className='text-center'>
          <UserRoleSelect
            userId={user.id}
            role={user.role as 'admin' | 'user'}
          />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created' />
    ),
    cell: ({ row }) => {
      const date = row.getValue<Date>('createdAt');
      return (
        <div className='text-muted-foreground text-sm'>
          {formatDistanceToNow(date, { addSuffix: true })}
        </div>
      );
    }
  },
  {
    accessorKey: 'banned',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const banned = row.original.banned;
      const banExpires = row.original.banExpires;

      if (banned) {
        const isExpired = banExpires && new Date() > banExpires;
        return (
          <Badge variant='destructive' className='text-xs'>
            {isExpired ? 'Ban Expired' : 'Banned'}
          </Badge>
        );
      }

      return (
        <Badge variant='default' className='text-xs'>
          Active
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      const banned = row.original.banned;
      return value.includes(banned ? 'banned' : 'active');
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className='flex items-center justify-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuLabel className='flex items-center gap-2'>
                <Eye className='h-4 w-4' />
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id)}
                className='flex items-center gap-2'
              >
                <Copy className='h-4 w-4' />
                Copy user ID
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.email)}
                className='flex items-center gap-2'
              >
                <Mail className='h-4 w-4' />
                Copy email
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className='flex items-center gap-2'>
                <Eye className='h-4 w-4' />
                View details
              </DropdownMenuItem>

              {user.banned && (
                <DropdownMenuItem className='flex items-center gap-2'>
                  <ShieldOff className='h-4 w-4' />
                  Unban user
                </DropdownMenuItem>
              )}

              {!user.banned && user.role === 'user' && (
                <DropdownMenuItem className='flex items-center gap-2 text-orange-600'>
                  <Shield className='h-4 w-4' />
                  Ban user
                </DropdownMenuItem>
              )}

              {/* Delete action */}
              <DropdownMenuSeparator />
              {user.role === 'user' ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className='text-destructive focus:text-destructive flex items-center gap-2'
                      onSelect={e => e.preventDefault()}
                    >
                      <Trash2 className='h-4 w-4' />
                      Delete user
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete User</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete{' '}
                        <strong>{user.name}</strong>? This action cannot be
                        undone and will permanently remove the user account and
                        all associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        onClick={async () => {
                          try {
                            const { deleteUserAction } = await import(
                              '@/actions/admin/delete-user.action'
                            );
                            const { toast } = await import('sonner');

                            const result = await deleteUserAction({
                              userId: user.id
                            });

                            if (result.error) {
                              toast.error(result.error);
                            } else {
                              toast.success('User deleted successfully');
                            }
                          } catch {
                            const { toast } = await import('sonner');
                            toast.error('Failed to delete user');
                          }
                        }}
                      >
                        Delete User
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <DropdownMenuItem
                  disabled
                  className='text-muted-foreground flex items-center gap-2'
                >
                  <Trash2 className='h-4 w-4' />
                  Delete user
                  <span className='ml-auto text-xs'>(Admin)</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];
