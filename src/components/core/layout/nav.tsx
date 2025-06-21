'use client';

import { UserButton } from '@daveyplate/better-auth-ui';
import { Brain, Home, Menu } from 'lucide-react';
import Link from 'next/link';

import { GitHubButton } from '@/components/core/shared/github-button';
import ThemeButton from '@/components/core/themes/theme-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { useMobile } from '@/hooks/use-mobile.hook';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const isMobile = useMobile();

  return (
    <div className='sticky top-0 right-0 left-0 z-50 mb-2 p-2 sm:p-4'>
      <nav
        className={cn(
          'bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur',
          'mx-auto max-w-7xl rounded-2xl border shadow-lg',
          'transition-all duration-300 ease-in-out'
        )}
      >
        <div className='flex h-12 items-center justify-between px-3 sm:h-14 sm:px-6'>
          {/* Logo Section */}
          <div className='flex min-w-0 flex-1 items-center'>
            <Link
              href='/'
              className='group flex items-center gap-2 transition-all duration-200 hover:opacity-80 sm:gap-3'
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className='bg-primary/10 group-hover:bg-primary/20 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 sm:h-9 sm:w-9'>
                <Brain className='text-primary h-4 w-4 transition-transform duration-200 group-hover:scale-110 sm:h-5 sm:w-5' />
              </div>
              <div className='flex min-w-0 items-center gap-2'>
                <span className='truncate font-mono text-lg font-bold sm:text-xl'>
                  aris.sh
                </span>
                <Badge
                  variant='outline'
                  className='xs:inline-flex hidden flex-shrink-0 rounded-full text-xs'
                >
                  beta
                </Badge>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className='flex flex-shrink-0 items-center gap-1 sm:gap-2'>
              <GitHubButton />
              <ModeToggle />
              <ThemeButton />
              <UserButton
                size='icon'
                additionalLinks={[
                  {
                    label: 'Dashboard',
                    href: '/dashboard',
                    icon: <Home />,
                    signedIn: true
                  }
                ]}
              />
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <div className='flex-shrink-0'>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-9 w-9 rounded-full'
                  >
                    <Menu className='h-5 w-5' />
                    <span className='sr-only'>Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side='bottom'
                  className='bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t p-6 backdrop-blur'
                >
                  <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <SheetDescription>
                      Access quick actions and account settings
                    </SheetDescription>
                  </VisuallyHidden>

                  <div className='flex h-full flex-col space-y-8'>
                    {/* Header */}
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full'>
                        <Brain className='text-primary h-5 w-5' />
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='font-mono text-lg font-bold'>
                          aris.sh
                        </span>
                        <Badge
                          variant='outline'
                          className='rounded-full text-xs'
                        >
                          beta
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Quick Actions */}
                    <div className='space-y-6'>
                      <h3 className='text-muted-foreground text-sm font-medium tracking-wide'>
                        Quick Actions
                      </h3>

                      <div className='space-y-3'>
                        <div className='bg-card/50 hover:bg-card flex items-center justify-between rounded-lg border p-4 transition-colors'>
                          <span className='text-sm font-medium'>GitHub</span>
                          <GitHubButton />
                        </div>

                        <div className='bg-card/50 hover:bg-card flex items-center justify-between rounded-lg border p-4 transition-colors'>
                          <span className='text-sm font-medium'>Theme</span>
                          <ModeToggle />
                        </div>

                        <div className='bg-card/50 hover:bg-card flex items-center justify-between rounded-lg border p-4 transition-colors'>
                          <span className='text-sm font-medium'>Customize</span>
                          <ThemeButton />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Account Section */}
                    <div className='space-y-6'>
                      <h3 className='text-muted-foreground text-sm font-medium tracking-wide'>
                        Account
                      </h3>

                      <div className='bg-card/50 hover:bg-card flex items-center justify-between rounded-lg border p-4 transition-colors'>
                        <span className='text-sm font-medium'>Profile</span>
                        <UserButton
                          size='icon'
                          additionalLinks={[
                            {
                              label: 'Dashboard',
                              href: '/dashboard',
                              icon: <Home />
                            }
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
