import {
  ThreadListItemPrimitive,
  ThreadListPrimitive
} from '@assistant-ui/react';
import { ArchiveIcon, PlusIcon } from 'lucide-react';
import type { FC } from 'react';

import { TooltipIconButton } from '@/components/assistant/tooltip-icon-button';
import { Button } from '@/components/ui/button';

export const ThreadList: FC = () => {
  return (
    <ThreadListPrimitive.Root className='flex flex-col items-stretch gap-1.5'>
      <ThreadListNew />
      <ThreadListItems />
    </ThreadListPrimitive.Root>
  );
};

const ThreadListNew: FC = () => {
  return (
    <ThreadListPrimitive.New asChild>
      <Button
        className='data-[active]:bg-muted hover:bg-muted flex items-center justify-start gap-1 px-2.5 py-2 text-start'
        style={{ borderRadius: 'var(--radius-lg)' }}
        variant='ghost'
      >
        <PlusIcon />
        New Thread
      </Button>
    </ThreadListPrimitive.New>
  );
};

const ThreadListItems: FC = () => {
  return <ThreadListPrimitive.Items components={{ ThreadListItem }} />;
};

const ThreadListItem: FC = () => {
  return (
    <ThreadListItemPrimitive.Root
      className='data-[active]:bg-muted hover:bg-muted focus-visible:bg-muted focus-visible:ring-ring flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:outline-none'
      style={{ borderRadius: 'var(--radius-lg)' }}
    >
      <ThreadListItemPrimitive.Trigger className='flex-grow px-3 py-2 text-start'>
        <ThreadListItemTitle />
      </ThreadListItemPrimitive.Trigger>
      <ThreadListItemArchive />
    </ThreadListItemPrimitive.Root>
  );
};

const ThreadListItemTitle: FC = () => {
  return (
    <p className='text-sm'>
      <ThreadListItemPrimitive.Title fallback='New Chat' />
    </p>
  );
};

const ThreadListItemArchive: FC = () => {
  return (
    <ThreadListItemPrimitive.Archive asChild>
      <TooltipIconButton
        className='hover:text-primary text-foreground mr-3 ml-auto size-4 p-0'
        variant='ghost'
        tooltip='Archive thread'
      >
        <ArchiveIcon />
      </TooltipIconButton>
    </ThreadListItemPrimitive.Archive>
  );
};
