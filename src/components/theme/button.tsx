'use client';

import {DARK_THEME, LIGHT_THEME} from '@blog/components/theme/types';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'react-feather';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => {
        const newTheme = resolvedTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        setTheme(newTheme);
      }}
      className="p-2.5 bg-white/15 hover:bg-primary/25 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-xl text-white/80 hover:text-primary border border-transparent backdrop-blur-md"
      aria-label="Toggle theme"
    >
      {resolvedTheme === DARK_THEME ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
