import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

export const AssistantSkeleton = () => {
  return (
    <SidebarProvider>
      {/* Sidebar Skeleton */}
      <div className='bg-background flex h-screen w-64 flex-col border-r'>
        <div className='flex h-16 items-center border-b px-4'>
          <Skeleton className='h-8 w-32' />
        </div>
        <div className='flex-1 space-y-2 p-4'>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className='h-10 w-full' />
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <Skeleton className='h-6 w-6' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-4 w-48' />
            <span className='text-muted-foreground'>/</span>
            <Skeleton className='h-4 w-16' />
          </div>
        </header>

        {/* Chat Thread Skeleton */}
        <div className='flex-1 overflow-hidden'>
          <div className='flex h-full flex-col'>
            <div className='flex-1 space-y-4 p-4'>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className='flex gap-3'>
                  <Skeleton className='h-8 w-8 rounded-full' />
                  <div className='flex-1 space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-3/4' />
                    <Skeleton className='h-4 w-1/2' />
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area Skeleton */}
            <div className='border-t p-4'>
              <div className='flex gap-2'>
                <Skeleton className='h-10 flex-1' />
                <Skeleton className='h-10 w-10' />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
