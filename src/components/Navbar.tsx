'use client';
import { Home, Search, PlusSquare, MessageCircle, Heart, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './TheamToggle';
const navItems = [
  { label: 'Home', icon: <Home size={26} />, href: '/' },
  { label: 'Search', icon: <Search size={26} />, href: '/search' },
  { label: 'Reels', icon: <PlusSquare size={26} />, href: '/reels' },
  { label: 'Messages', icon: <MessageCircle size={26} />, href: '/messages' },
  { label: 'Notifications', icon: <Heart size={26} />, href: '/notifications' },
  { label: 'Profile', icon: <User size={26} />, href: '/profile' },
];

export default function   Navbar() {
  const [active, setActive] = useState('/');
  const { theme, setTheme } = useTheme();
  const [Logo, setLogo] = useState<string>( '/black_logo.svg' )
  useEffect(()=>{
    theme === 'dark' ?setLogo('/white_logo.svg'):setLogo('/black_logo.svg')
  },[theme])
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 dark:bg-black border-t border-gray-900 md:top-0 md:bottom-auto md:w-55 md:h-screen md:border-r">
      <div className='w-full p-4 hidden md:flex'>
          <Image src={Logo} alt='Logo' height={37} width={163} />
      </div>
      <ul className="w-full flex justify-around md:flex-col md:justify-start md:items-center p-2 gap-4">
        {navItems.map((item) => (
          <li key={item.label} className="flex items-center w-full">
            <Link href={item.href} 
            className='flex items-center content-start w-full h-full  '
            onClick={() => setActive(item.href)}>  
              <div
                className='flex items-center justify-start gap-2 w-full p-2 px-3 md:hover:bg-gray-100 md:hover:dark:bg-zinc-800 rounded-sm bg-none dark:text-white text-black'
              >{item.icon}<h3 className="hidden md:block font-semibold text-lg">{item.label}</h3>
              </div>
            </Link>
          </li>
        ))}
        <li key={'togaltheam'} className="flex items-center content-start w-full px-2 md:mb-3" ><ThemeToggle/></li>
      </ul>
    </nav>
  );
}
