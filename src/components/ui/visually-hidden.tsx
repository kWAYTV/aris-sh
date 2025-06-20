import * as React from 'react';

import { cn } from '@/lib/utils';

function VisuallyHidden({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'absolute -m-px h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap [clip:rect(0,0,0,0)]',
        className
      )}
      {...props}
    />
  );
}

export { VisuallyHidden };
