'use client';

import { UserButton } from '@daveyplate/better-auth-ui';
import { Brain } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

import { ModeToggle } from '@/components/ui/mode-toggle';
import { cn } from '@/lib/utils';

export default function Navbar() {
  return (
    <motion.div
      className='sticky top-0 right-0 left-0 z-50 mb-2 p-4'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav
        className={cn(
          'bg-background/60 mx-auto max-w-7xl rounded-xl border shadow-lg',
          'p-2 backdrop-blur-md transition-all duration-700'
        )}
      >
        <div className='flex h-14 items-center justify-between px-4'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href='/'
              className='group flex items-center gap-3 transition-all duration-200 hover:opacity-80'
            >
              <Brain className='h-6 w-6 transition-transform duration-200 group-hover:scale-110' />
              <span className='font-mono text-xl font-bold'>aris.sh</span>
            </Link>
          </motion.div>

          <motion.div
            className='flex items-center gap-3'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ModeToggle />
            <UserButton size='icon' />
          </motion.div>
        </div>
      </nav>
    </motion.div>
  );
}
