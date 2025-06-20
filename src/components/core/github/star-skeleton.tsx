import { Skeleton } from '@/components/ui/skeleton';

interface StarSkeletonProps {
  className?: string;
}

export function StarSkeleton({ className }: StarSkeletonProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Skeleton className='h-4 w-4 rounded-sm' />
      <Skeleton className='h-4 w-12' />
    </div>
  );
}
