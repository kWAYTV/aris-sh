'use client';

import { UserButton } from '@daveyplate/better-auth-ui';
import { Brain, Home, Menu } from 'lucide-react';
import Link from 'next/link';

import { GitHubButton } from '@/components/core/shared/github-button';
import ThemeButton from '@/components/core/themes/theme-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import {
  Sheet,
  SheetContent,
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
                  { label: 'Dashboard', href: '/dashboard', icon: <Home /> }
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
                  side='right'
                  className='bg-background/95 supports-[backdrop-filter]:bg-background/60 w-72 border-l backdrop-blur'
                >
                  <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </VisuallyHidden>

                  <div className='flex h-full flex-col'>
                    {/* Header */}
                    <div className='mb-6 flex items-center gap-3 border-b pb-6'>
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

                    {/* Navigation Items */}
                    <div className='flex-1 space-y-6'>
                      <div className='space-y-4'>
                        <h3 className='text-muted-foreground text-sm font-medium tracking-wider uppercase'>
                          Quick Actions
                        </h3>

                        <div className='grid grid-cols-2 gap-4'>
                          <div className='bg-card hover:bg-accent flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors'>
                            <GitHubButton />
                            <span className='text-muted-foreground text-xs'>
                              GitHub
                            </span>
                          </div>

                          <div className='bg-card hover:bg-accent flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors'>
                            <ModeToggle />
                            <span className='text-muted-foreground text-xs'>
                              Theme
                            </span>
                          </div>
                        </div>

                        <div className='flex justify-center'>
                          <div className='bg-card hover:bg-accent flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors'>
                            <ThemeButton />
                            <span className='text-muted-foreground text-xs'>
                              Customize
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Account Section */}
                      <div className='space-y-4 border-t pt-6'>
                        <h3 className='text-muted-foreground text-sm font-medium tracking-wider uppercase'>
                          Account
                        </h3>

                        <div className='flex items-center justify-center'>
                          <UserButton
                            size='lg'
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
