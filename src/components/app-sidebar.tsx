import { UserButton } from '@daveyplate/better-auth-ui';
import { Brain } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { ThreadList } from '@/components/assistant/thread-list';
import { GitHubButton } from '@/components/core/shared/github-button';
import ThemeButton from '@/components/core/themes/theme-button';
import { Badge } from '@/components/ui/badge';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='https://aris.sh'>
                <div className='hover:bg-accent hover:text-accent-foreground flex aspect-square size-8 items-center justify-center rounded-lg border transition-colors'>
                  <Brain className='size-4' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-semibold'>aris.sh</span>
                </div>
                <Badge variant='outline' className='ml-auto'>
                  <span className='text-xs'>beta</span>
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ThreadList />
      </SidebarContent>

      <SidebarRail />
      <SidebarFooter>
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem>
            <div className='flex items-center justify-between gap-2 px-2 py-1'>
              <div className='flex items-center gap-2'>
                <ModeToggle />
                <ThemeButton />
                <GitHubButton />
              </div>
              <UserButton size='icon' />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
