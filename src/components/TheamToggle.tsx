'use client'
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, icons, Theater } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme == 'dark'? <Sun/> : <Moon/>}
    </Button>
  );
}