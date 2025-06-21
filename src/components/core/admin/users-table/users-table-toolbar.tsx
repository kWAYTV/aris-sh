'use client';

import { type Table } from '@tanstack/react-table';
import {
  MoreHorizontal,
  Shield,
  ShieldOff,
  Trash2,
  UserCheck,
  UserX,
  X
} from 'lucide-react';

import { DataTableViewOptions } from '@/components/core/admin/users-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { type User } from '@/lib/auth';

interface UsersTableToolbarProps<TData> {
  table: Table<TData>;
  onBulkDelete?: (userIds: string[]) => void;
  onBulkRoleChange?: (userIds: string[], role: 'admin' | 'user') => void;
  onBulkBan?: (userIds: string[]) => void;
  onBulkUnban?: (userIds: string[]) => void;
}

export function UsersTableToolbar<TData>({
  table,
  onBulkDelete,
  onBulkRoleChange,
  onBulkBan,
  onBulkUnban
}: UsersTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelection = selectedRows.length > 0;

  // Check if any selected users are admins
  const selectedUsers = selectedRows.map(row => row.original as User);
  const hasAdminSelected = selectedUsers.some(user => user.role === 'admin');
  const onlyAdminsSelected = selectedUsers.every(user => user.role === 'admin');
  const hasBannedUsers = selectedUsers.some(user => user.banned);
  const hasUnbannedUsers = selectedUsers.some(user => !user.banned);

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 items-center space-x-2'>
          <Input
            placeholder='Filter emails...'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className='h-8 w-[150px] lg:w-[250px]'
          />
          <Input
            placeholder='Filter names...'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className='h-8 w-[150px] lg:w-[250px]'
          />
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'
            >
              Reset
              <X />
            </Button>
          )}
        </div>

        {!hasSelection && <DataTableViewOptions table={table} />}
      </div>

      {hasSelection && (
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground text-sm font-medium'>
              {selectedRows.length} selected
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='h-8'>
                  Bulk Actions
                  <MoreHorizontal className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {onBulkRoleChange && (
                  <>
                    {onlyAdminsSelected ? (
                      <DropdownMenuItem
                        disabled
                        className='text-muted-foreground'
                      >
                        <UserX className='mr-2 h-4 w-4' />
                        Make {selectedRows.length === 1 ? 'User' : 'Users'}
                        <span className='ml-auto text-xs'>(Admin)</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => {
                          const userIds = selectedRows
                            .filter(
                              row => (row.original as User).role !== 'admin'
                            )
                            .map(row => (row.original as User).id);
                          if (userIds.length > 0) {
                            onBulkRoleChange(userIds, 'user');
                          }
                        }}
                      >
                        <UserX className='mr-2 h-4 w-4' />
                        Make {selectedRows.length === 1 ? 'User' : 'Users'}
                      </DropdownMenuItem>
                    )}

                    {hasAdminSelected ? (
                      <DropdownMenuItem
                        disabled
                        className='text-muted-foreground'
                      >
                        <UserCheck className='mr-2 h-4 w-4' />
                        Make {selectedRows.length === 1 ? 'Admin' : 'Admins'}
                        <span className='ml-auto text-xs'>(Admin)</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => {
                          const userIds = selectedRows
                            .filter(
                              row => (row.original as User).role !== 'admin'
                            )
                            .map(row => (row.original as User).id);
                          if (userIds.length > 0) {
                            onBulkRoleChange(userIds, 'admin');
                          }
                        }}
                      >
                        <UserCheck className='mr-2 h-4 w-4' />
                        Make {selectedRows.length === 1 ? 'Admin' : 'Admins'}
                      </DropdownMenuItem>
                    )}
                  </>
                )}

                {/* Ban/Unban Actions */}
                {(onBulkBan || onBulkUnban) &&
                  (hasUnbannedUsers || hasBannedUsers) && (
                    <>
                      <DropdownMenuSeparator />

                      {/* Bulk Ban */}
                      {onBulkBan && hasUnbannedUsers && (
                        <>
                          {hasAdminSelected ? (
                            <DropdownMenuItem
                              disabled
                              className='text-muted-foreground'
                            >
                              <Shield className='mr-2 h-4 w-4' />
                              Ban {selectedRows.length === 1 ? 'User' : 'Users'}
                              <span className='ml-auto text-xs'>(Admin)</span>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className='text-orange-600 focus:text-orange-600'
                              onClick={() => {
                                const userIds = selectedUsers
                                  .filter(
                                    user =>
                                      user.role !== 'admin' && !user.banned
                                  )
                                  .map(user => user.id);
                                if (userIds.length > 0) {
                                  onBulkBan(userIds);
                                }
                              }}
                            >
                              <Shield className='mr-2 h-4 w-4' />
                              Ban {selectedRows.length === 1 ? 'User' : 'Users'}
                            </DropdownMenuItem>
                          )}
                        </>
                      )}

                      {/* Bulk Unban */}
                      {onBulkUnban && hasBannedUsers && (
                        <DropdownMenuItem
                          onClick={() => {
                            const userIds = selectedUsers
                              .filter(user => user.banned)
                              .map(user => user.id);
                            if (userIds.length > 0) {
                              onBulkUnban(userIds);
                            }
                          }}
                        >
                          <ShieldOff className='mr-2 h-4 w-4' />
                          Unban {selectedRows.length === 1 ? 'User' : 'Users'}
                        </DropdownMenuItem>
                      )}
                    </>
                  )}

                {onBulkDelete && (
                  <>
                    <DropdownMenuSeparator />
                    {hasAdminSelected ? (
                      <DropdownMenuItem
                        disabled
                        className='text-muted-foreground'
                      >
                        <Trash2 className='mr-2 h-4 w-4' />
                        Delete {selectedRows.length === 1 ? 'User' : 'Users'}
                        <span className='ml-auto text-xs'>(Admin)</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        className='text-destructive focus:text-destructive'
                        onClick={() => {
                          const userIds = selectedRows
                            .filter(
                              row => (row.original as User).role !== 'admin'
                            )
                            .map(row => (row.original as User).id);
                          if (userIds.length > 0) {
                            onBulkDelete(userIds);
                          }
                        }}
                      >
                        <Trash2 className='mr-2 h-4 w-4' />
                        Delete {selectedRows.length === 1 ? 'User' : 'Users'}
                      </DropdownMenuItem>
                    )}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DataTableViewOptions table={table} />
        </div>
      )}
    </div>
  );
}
