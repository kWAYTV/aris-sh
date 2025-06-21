'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/core/admin/users-table/data-table-column-header';
import {
  DeleteUserButton,
  PlaceholderDeleteUserButton
} from '@/components/core/admin/users-table/delete-user-button';
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
        <div className='flex items-center justify-center gap-2'>
          {user.role === 'user' ? (
            <DeleteUserButton userId={user.id} />
          ) : (
            <PlaceholderDeleteUserButton />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.email)}
              >
                Copy email
              </DropdownMenuItem>
              {user.banned && <DropdownMenuItem>Unban user</DropdownMenuItem>}
              {!user.banned && user.role === 'user' && (
                <DropdownMenuItem className='text-destructive'>
                  Ban user
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];
