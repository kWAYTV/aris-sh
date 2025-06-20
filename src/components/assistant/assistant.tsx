'use client';

import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChatRuntime } from '@assistant-ui/react-ai-sdk';
import { Brain } from 'lucide-react';

import { Thread } from '@/components/assistant/thread';
import { GitHubStars } from '@/components/core/github/stars';
import { AppSidebar } from '@/components/core/sidebar/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';

export const Assistant = () => {
  const runtime = useChatRuntime({
    api: '/api/chat'
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
            <SidebarTrigger />

            <Separator orientation='vertical' className='mr-2 h-4' />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='#'>
                    <Brain className='size-4' />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>aris.sh</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className='ml-auto'>
              <GitHubStars />
            </div>
          </header>

          <Thread />
        </SidebarInset>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
};
