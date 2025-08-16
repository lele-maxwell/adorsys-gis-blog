'use client';

import Link from 'next/link';
import { Home as HomeIcon, BookOpen, Search } from 'react-feather';
import { LanguageSwitcher } from '@blog/components/language-switcher';
import { usePathname } from 'next/navigation';

export default function VerticalNavigation() {
  const pathname = usePathname();

  // Check if current page is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className='fixed left-6 top-1/2 transform -translate-y-1/2 z-40'>
      {/* Main Navigation Container */}
      <div className='bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20'>
        {/* Navigation Items */}
        <div className='flex flex-col items-center gap-5'>
          {/* Home */}
          <Link 
            href='/' 
            className={`group relative flex flex-col items-center gap-2 transition-all duration-300 ${
              isActive('/') ? 'text-primary' : 'text-white/80 hover:text-primary'
            }`}
          >
            <div className={`p-2.5 rounded-xl transition-all duration-300 ${
              isActive('/') 
                ? 'bg-primary/30 border border-primary/40 shadow-lg shadow-primary/20' 
                : 'bg-white/15 hover:bg-primary/25 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20'
            }`}>
              <HomeIcon className='w-5 h-5' />
            </div>
            <span className='text-xs font-medium whitespace-nowrap'>Home</span>
          </Link>

          {/* Courses */}
          <Link 
            href='/courses' 
            className={`group relative flex flex-col items-center gap-2 transition-all duration-300 ${
              isActive('/courses') ? 'text-primary' : 'text-white/80 hover:text-primary'
            }`}
          >
            <div className={`p-2.5 rounded-xl transition-all duration-300 ${
              isActive('/courses') 
                ? 'bg-primary/30 border border-primary/40 shadow-lg shadow-primary/20' 
                : 'bg-white/15 hover:bg-primary/25 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20'
            }`}>
              <BookOpen className='w-5 h-5' />
            </div>
            <span className='text-xs font-medium whitespace-nowrap'>Courses</span>
          </Link>

          {/* Search */}
          <div className='group relative flex flex-col items-center gap-2 cursor-pointer'>
            <div className='p-2.5 rounded-xl bg-white/15 hover:bg-primary/25 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-transparent'>
              <Search className='w-5 h-5 text-white/80 group-hover:text-primary' />
            </div>
            <span className='text-xs font-medium text-white/80 group-hover:text-primary whitespace-nowrap'>Search</span>
          </div>

          {/* Separator */}
          <div className='w-6 h-px bg-white/30 rounded-full'></div>

          {/* Language Selector */}
          <div className='flex flex-col items-center gap-2'>
            <LanguageSwitcher variant="icon-only" />
            <span className='text-xs font-medium text-white/80 group-hover:text-primary whitespace-nowrap'>Language</span>
          </div>
        </div>
      </div>
    </div>
  );
} 