import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive
} from '@assistant-ui/react';
import { UserAvatar } from '@daveyplate/better-auth-ui';
import {
  ArrowDownIcon,
  BotIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  SendHorizontalIcon
} from 'lucide-react';
import type { FC } from 'react';
import { Spoiler } from 'spoiled';

import { MarkdownText } from '@/components/assistant/markdown-text';
import { ToolFallback } from '@/components/assistant/tool-fallback';
import { TooltipIconButton } from '@/components/assistant/tooltip-icon-button';
import { Button } from '@/components/ui/button';
import { Spotlight } from '@/components/ui/spotlight';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { useSession } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root
      className='bg-background box-border flex h-full flex-col overflow-hidden'
      style={{
        ['--thread-max-width' as string]: '42rem'
      }}
    >
      <ThreadPrimitive.Viewport className='flex h-full flex-col items-center overflow-y-scroll scroll-smooth bg-inherit px-4 pt-8'>
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage: UserMessage,
            EditComposer: EditComposer,
            AssistantMessage: AssistantMessage
          }}
        />

        <ThreadPrimitive.If empty={false}>
          <div className='min-h-8 flex-grow' />
        </ThreadPrimitive.If>

        <div
          className='sticky bottom-0 mt-3 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end bg-inherit pb-4'
          style={{
            borderTopLeftRadius: 'var(--radius-lg)',
            borderTopRightRadius: 'var(--radius-lg)'
          }}
        >
          <ThreadScrollToBottom />
          <Composer />
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip='Scroll to bottom'
        variant='outline'
        className='absolute -top-8 disabled:invisible'
        style={{ borderRadius: '50%' }}
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcome: FC = () => {
  'use client';
  const { data: session } = useSession();
  if (!session) return null;

  const user = session.user;

  return (
    <ThreadPrimitive.Empty>
      <div className='flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col'>
        <div className='flex w-full flex-grow flex-col items-center justify-center space-y-6 px-4 py-12'>
          <div className='space-y-4 text-center'>
            <h1 className='text-foreground text-3xl font-bold tracking-tight'>
              Welcome, <Spoiler className='text-primary'>{user?.name}</Spoiler>
            </h1>
            <TextShimmer className='text-xl font-medium'>
              How can I help you today?
            </TextShimmer>
          </div>
          <div className='flex w-full max-w-md items-center justify-center'>
            <div className='via-border h-px w-full bg-gradient-to-r from-transparent to-transparent' />
          </div>
        </div>
        <ThreadWelcomeSuggestions />
      </div>
    </ThreadPrimitive.Empty>
  );
};

const ThreadWelcomeSuggestions: FC = () => {
  return (
    <div className='mt-6 flex w-full items-stretch justify-center gap-3'>
      <ThreadPrimitive.Suggestion
        className='group border-border/50 from-background to-muted/20 hover:border-border hover:shadow-primary/5 relative flex max-w-sm grow basis-0 flex-col items-start justify-center overflow-hidden rounded-2xl border bg-gradient-to-br p-4 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg'
        prompt='Help me write a React component'
        method='replace'
        autoSend
      >
        <div className='bg-primary/10 mb-2 rounded-lg p-2'>
          <svg
            className='text-primary h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
            />
          </svg>
        </div>
        <span className='text-foreground/90 group-hover:text-foreground text-sm leading-relaxed font-medium'>
          Help me write a React component
        </span>
        <span className='text-muted-foreground mt-1 text-xs'>
          Get help building UI components
        </span>
      </ThreadPrimitive.Suggestion>

      <ThreadPrimitive.Suggestion
        className='group border-border/50 from-background to-muted/20 hover:border-border hover:shadow-primary/5 relative flex max-w-sm grow basis-0 flex-col items-start justify-center overflow-hidden rounded-2xl border bg-gradient-to-br p-4 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg'
        prompt='Write me a poem about the moon.'
        method='replace'
        autoSend
      >
        <div className='bg-primary/10 mb-2 rounded-lg p-2'>
          <svg
            className='text-primary h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
            />
          </svg>
        </div>
        <span className='text-foreground/90 group-hover:text-foreground text-sm leading-relaxed font-medium'>
          Write me a poem about the moon
        </span>
        <span className='text-muted-foreground mt-1 text-xs'>
          Creative writing and poetry
        </span>
      </ThreadPrimitive.Suggestion>
    </div>
  );
};

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root
      className='focus-within:border-ring/20 flex w-full flex-wrap items-end border bg-inherit px-2.5 shadow-sm transition-colors ease-in'
      style={{ borderRadius: 'var(--radius-lg)' }}
    >
      <Spotlight
        className='bg-zinc-700 blur-2xl'
        size={64}
        springOptions={{
          bounce: 0.3,
          duration: 0.1
        }}
      />
      <ComposerPrimitive.Input
        rows={1}
        autoFocus
        placeholder='Write a message...'
        className='placeholder:text-muted-foreground max-h-40 flex-grow resize-none border-none bg-transparent px-2 py-4 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed'
      />
      <ComposerAction />
    </ComposerPrimitive.Root>
  );
};

const ComposerAction: FC = () => {
  return (
    <>
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            tooltip='Send'
            variant='default'
            className='my-2.5 size-8 p-2 transition-opacity ease-in'
          >
            <SendHorizontalIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <TooltipIconButton
            tooltip='Cancel'
            variant='default'
            className='my-2.5 size-8 p-2 transition-opacity ease-in'
          >
            <CircleStopIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </>
  );
};

const UserMessage: FC = () => {
  const { data: session } = useSession();

  return (
    <MessagePrimitive.Root className='grid w-full max-w-[var(--thread-max-width)] auto-rows-auto grid-cols-[auto_minmax(72px,1fr)_auto] gap-x-3 gap-y-2 py-4'>
      <div className='col-start-3 row-start-2 flex justify-end'>
        <UserAvatar user={session?.user || null} size='sm' className='size-8' />
      </div>

      <UserActionBar />

      <div
        className='bg-muted text-foreground col-start-2 row-start-2 max-w-[calc(var(--thread-max-width)*0.8)] px-5 py-2.5 break-words'
        style={{ borderRadius: 'var(--radius-xl)' }}
      >
        <MessagePrimitive.Content />
      </div>

      <BranchPicker className='col-span-full col-start-1 row-start-3 -mr-1 justify-end' />
    </MessagePrimitive.Root>
  );
};

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide='not-last'
      className='col-start-1 row-start-2 mt-2.5 flex flex-col items-start'
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton tooltip='Edit'>
          <PencilIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

const EditComposer: FC = () => {
  return (
    <ComposerPrimitive.Root
      className='bg-muted my-4 flex w-full max-w-[var(--thread-max-width)] flex-col gap-2'
      style={{ borderRadius: 'var(--radius-xl)' }}
    >
      <ComposerPrimitive.Input className='text-foreground flex h-8 w-full resize-none bg-transparent p-4 pb-0 outline-none' />

      <div className='mx-3 mb-3 flex items-center justify-center gap-2 self-end'>
        <ComposerPrimitive.Cancel asChild>
          <Button variant='ghost'>Cancel</Button>
        </ComposerPrimitive.Cancel>
        <ComposerPrimitive.Send asChild>
          <Button>Send</Button>
        </ComposerPrimitive.Send>
      </div>
    </ComposerPrimitive.Root>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className='relative grid w-full max-w-[var(--thread-max-width)] grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] gap-x-3 py-4'>
      <div className='col-start-1 row-start-1 flex justify-start'>
        <div
          className='bg-primary text-primary-foreground flex size-8 items-center justify-center'
          style={{ borderRadius: '50%' }}
        >
          <BotIcon className='size-4' />
        </div>
      </div>

      <div className='text-foreground col-span-2 col-start-2 row-start-1 my-1.5 max-w-[calc(var(--thread-max-width)*0.8)] leading-7 break-words'>
        <MessagePrimitive.Content
          components={{ Text: MarkdownText, tools: { Fallback: ToolFallback } }}
        />
      </div>

      <AssistantActionBar />

      <BranchPicker className='col-start-2 row-start-2 mr-2 -ml-2' />
    </MessagePrimitive.Root>
  );
};

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide='not-last'
      autohideFloat='single-branch'
      className='text-muted-foreground data-[floating]:bg-background col-start-3 row-start-2 -ml-1 flex gap-1 data-[floating]:absolute data-[floating]:border data-[floating]:p-1 data-[floating]:shadow-sm'
      style={
        {
          '--data-floating-border-radius': 'var(--radius-md)'
        } as React.CSSProperties
      }
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip='Copy'>
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip='Refresh'>
          <RefreshCwIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn(
        'text-muted-foreground inline-flex items-center text-xs',
        className
      )}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip='Previous'>
          <ChevronLeftIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className='font-medium'>
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip='Next'>
          <ChevronRightIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};

const CircleStopIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      fill='currentColor'
      width='16'
      height='16'
    >
      <rect width='10' height='10' x='3' y='3' rx='2' />
    </svg>
  );
};
