'use client';

import { type Table } from '@tanstack/react-table';
import { Trash2, UserCheck, UserX, X } from 'lucide-react';

import { DataTableViewOptions } from '@/components/core/admin/users-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type User } from '@/lib/auth';

interface UsersTableToolbarProps<TData> {
  table: Table<TData>;
  onBulkDelete?: (userIds: string[]) => void;
  onBulkRoleChange?: (userIds: string[], role: 'admin' | 'user') => void;
}

export function UsersTableToolbar<TData>({
  table,
  onBulkDelete,
  onBulkRoleChange
}: UsersTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelection = selectedRows.length > 0;

  return (
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

      {hasSelection && (
        <div className='flex items-center space-x-2'>
          <span className='text-muted-foreground text-sm'>
            {selectedRows.length} selected
          </span>
          {onBulkRoleChange && (
            <>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  const userIds = selectedRows.map(
                    row => (row.original as User).id
                  );
                  onBulkRoleChange(userIds, 'user');
                }}
                className='h-8'
              >
                <UserX className='mr-2 h-4 w-4' />
                Make User
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  const userIds = selectedRows.map(
                    row => (row.original as User).id
                  );
                  onBulkRoleChange(userIds, 'admin');
                }}
                className='h-8'
              >
                <UserCheck className='mr-2 h-4 w-4' />
                Make Admin
              </Button>
            </>
          )}
          {onBulkDelete && (
            <Button
              variant='destructive'
              size='sm'
              onClick={() => {
                const userIds = selectedRows.map(
                  row => (row.original as User).id
                );
                onBulkDelete(userIds);
              }}
              className='h-8'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </Button>
          )}
        </div>
      )}

      <DataTableViewOptions table={table} />
    </div>
  );
}
