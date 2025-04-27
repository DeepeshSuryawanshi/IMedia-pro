'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

export default function Login() {
  const { theme } = useTheme();
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false)
  const [Logo, setLogo] = useState<string>('/black_logo.svg')
  useEffect(()=>{
    theme === 'dark' ?setLogo('/white_logo.svg'):setLogo('/black_logo.svg')
  },[theme])
  return (
    <div  className='w-full h-90 flex items-center justify-center '>
      <div className='main p-3 dark:border md:w-80'>
          <form >
            <div className='flex justify-center'> 
              <Image src={Logo} alt='Logo' height={37} width={163} />
            </div>
            <div className='gap-2 flex flex-col p-3 mt-6'>
              <Input type="text" placeholder='Username or Email' />
              <Input type={showPass?'text':'password'} placeholder='password' />
            </div>
          </form>
      </div>
    </div>
  )
}
