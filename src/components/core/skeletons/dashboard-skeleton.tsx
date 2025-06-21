import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className='flex h-full items-center justify-center p-6'>
      <div className='w-full max-w-2xl space-y-6'>
        {/* Header skeleton */}
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-[120px]' />
            <Skeleton className='h-4 w-[180px]' />
          </div>
          <Skeleton className='h-9 w-[140px]' />
        </div>

        {/* Profile Card skeleton */}
        <Card>
          <CardHeader>
            <div className='flex items-start gap-4'>
              {/* Avatar skeleton */}
              <Skeleton className='size-16 rounded-full' />

              <div className='flex-1 space-y-3'>
                {/* Name and badge skeleton */}
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-7 w-[120px]' />
                  <Skeleton className='h-6 w-[60px] rounded-full' />
                </div>

                {/* Email skeleton */}
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-4 w-[200px]' />
                  <Skeleton className='size-4 rounded-full' />
                </div>

                {/* Username skeleton */}
                <div className='flex items-center gap-2'>
                  <Skeleton className='size-4' />
                  <Skeleton className='h-4 w-[100px]' />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            <Separator />

            {/* User details skeleton */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[100px]' />
                <Skeleton className='h-4 w-[140px]' />
              </div>

              <div className='space-y-2'>
                <Skeleton className='h-4 w-[110px]' />
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-6 w-[60px] rounded-full' />
                  <Skeleton className='h-6 w-[70px] rounded-full' />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
