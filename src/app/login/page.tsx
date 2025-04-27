'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye,EyeOff } from 'lucide-react';

export default function Login() {
  const { theme } = useTheme();
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false)
  const [Logo, setLogo] = useState<string>('/black_logo.svg')
  useEffect(() => {
    theme === 'dark' ? setLogo('/white_logo.svg') : setLogo('/black_logo.svg')
  }, [theme])
  return (
    <div className='w-full h-[100vh] flex items-center justify-center '>
      <div className='main p-3 flex flex-col border md:w-80'>
        <form >
          <div className='flex justify-center'>
            <Image src={Logo} alt='Logo' height={37} width={163} />
          </div>
          <div className='gap-4 flex flex-col p-3 mt-6'>
            <Input type="text" placeholder='Username or Email' />
            <div className='relative w-full'>
              <span onClick={()=>setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPass? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
              <Input type={showPass ? 'text' : 'password'} placeholder='password'  />
            </div>
            <Button type='submit' className='bg-blue-600 hover:bg-blue-800 text-white' >Login</Button>
          </div>
          <Link href={"#"} className='text-sm m-2 mx-3 hover:text-blue-400'>Forgot Password!</Link>
        </form>
        <div className='devider text-center flex items-center justify-center gap-2'>
          <span className='inline-block w-28 text-red h-[1px] dark:bg-zinc-600 bg-gray-300'></span><p className='text-[#a8a8a8] text-[13px] '>or</p><span className='inline-block w-28 text-red h-[1px] dark:bg-zinc-600 bg-gray-300'></span>
        </div>
        <div className='flex items-center justify-center p-3'>
          <p className='text-sm'>Don't have an account? <Link href={"#"} className='hover:text-blue-600'>Sign up</Link> </p>
        </div>
        <div className='auth-link flex justify-center '>
          pending
        </div>
      </div>
    </div>
  )
}
