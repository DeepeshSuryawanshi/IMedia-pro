'use client'
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, icons, Theater } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [Icon, setIcon] = useState(<Sun/>)
  useEffect(()=>{
    theme === 'dark' ? setIcon(<Sun/>) : setIcon(<Moon/>)
  },[theme])
  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {Icon}
    </Button>
  );
}