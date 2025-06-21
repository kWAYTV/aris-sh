import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export function UsersTableSkeleton() {
  return (
    <div className='w-full space-y-4'>
      {/* Toolbar skeleton */}
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 items-center space-x-2'>
          <Skeleton className='h-8 w-[150px] lg:w-[250px]' />
          <Skeleton className='h-8 w-[150px] lg:w-[250px]' />
          <Skeleton className='h-8 w-[60px]' />
        </div>
        <Skeleton className='h-8 w-[100px]' />
      </div>

      {/* Table skeleton */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[40px]'>
                <Skeleton className='h-4 w-4' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-[60px]' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-[100px]' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-[150px]' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-[80px]' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-[100px]' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-[80px]' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-[100px]' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className='h-4 w-4' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[60px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[100px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[180px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='mx-auto h-8 w-[120px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[80px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-6 w-[60px]' />
                </TableCell>
                <TableCell>
                  <div className='flex items-center justify-center gap-2'>
                    <Skeleton className='h-7 w-7' />
                    <Skeleton className='h-8 w-8' />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination skeleton */}
      <div className='flex items-center justify-between px-2'>
        <Skeleton className='h-4 w-[100px]' />
        <div className='flex items-center space-x-6 lg:space-x-8'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='h-8 w-[70px]' />
          </div>
          <Skeleton className='h-4 w-[100px]' />
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
          </div>
        </div>
      </div>
    </div>
  );
}
