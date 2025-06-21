import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className='flex h-full items-center justify-center p-6'>
      <div className='w-full max-w-[480px] space-y-4'>
        {/* Header skeleton */}
        <div className='flex items-center justify-between'>
          <Skeleton className='h-8 w-[100px]' />
          <Skeleton className='h-9 w-[140px]' />
        </div>

        {/* JsonViewer skeleton */}
        <div className='bg-muted/20 space-y-2 overflow-x-auto rounded-md border p-4'>
          <div className='space-y-3'>
            {/* User data skeleton lines */}
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-[60px]' />
              <Skeleton className='h-4 w-[200px]' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-[80px]' />
              <Skeleton className='h-4 w-[180px]' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-[50px]' />
              <Skeleton className='h-4 w-[220px]' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-[70px]' />
              <Skeleton className='h-4 w-[100px]' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-[90px]' />
              <Skeleton className='h-4 w-[150px]' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-[110px]' />
              <Skeleton className='h-4 w-[80px]' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-[60px]' />
              <Skeleton className='h-4 w-[40px]' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-[120px]' />
              <Skeleton className='h-4 w-[160px]' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-[80px]' />
              <Skeleton className='h-4 w-[160px]' />
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='h-4 w-[120px]' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
