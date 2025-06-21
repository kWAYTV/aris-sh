'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { JsonViewer } from '@/components/core/shared/json-viewer';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { type User } from '@/lib/auth';

interface JsonDebugProps {
  user: User;
}

export function JsonDebug({ user }: JsonDebugProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className='space-y-2'>
      <CollapsibleTrigger className='bg-muted/20 hover:bg-muted/40 flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors'>
        <span className='text-muted-foreground'>Debug</span>
        <ChevronDown
          className={`text-muted-foreground size-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className='bg-muted/20 rounded-md border p-3'>
          <JsonViewer data={user} className='text-xs' />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
