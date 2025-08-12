"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import Dashboard from '../page'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header () {

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='flex p-4 items-center justify-between bg-secondary'>
      <Image src={'./logo.svg'} width={150} height={80} alt='logo'/>
      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions '&&' text-primary hover:font-bold'}`}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/Upgrade '&&' text-primary hover:font-bold'}`}>Question</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/How it works '&&' text-primary hover:font-bold'}`}>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard '&&' text-primary hover:font-bold'}`}>How it works?</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header


