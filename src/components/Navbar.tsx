// components/Navbar.tsx
'use client';

import { Home, Search, PlusSquare, MessageCircle, Heart, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './TheamToggle';

const navItems = [
  { label: 'Home', icon: <Home />, href: '/' },
  { label: 'Search', icon: <Search />, href: '/search' },
  { label: 'Reels', icon: <PlusSquare />, href: '/reels' },
  { label: 'Messages', icon: <MessageCircle />, href: '/messages' },
  { label: 'Notifications', icon: <Heart />, href: '/notifications' },
  { label: 'Profile', icon: <User />, href: '/profile' },
];

export default function   Navbar() {
  const [active, setActive] = useState('/');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:top-0 md:bottom-auto md:w-20 md:h-screen md:border-r">
      <ul className="flex justify-around md:flex-col md:justify-start md:items-center p-2 gap-4">
        {navItems.map((item) => (
          <li key={item.label} className="flex flex-col items-center md:mb-6">
            <Link href={item.href} onClick={() => setActive(item.href)}>
              <Button
                variant="ghost"
                className={`flex flex-col items-center text-sm ${
                  active === item.href ? 'text-black' : 'text-gray-500'
                }`}
              >
                {item.icon}
                <span className="hidden md:block text-xs">{item.label}</span>
              </Button>
            </Link>
          </li>
        ))}
        <li><ThemeToggle/></li>
      </ul>
    </nav>
  );
}
