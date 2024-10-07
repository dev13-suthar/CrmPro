"use client"
import React from 'react'
import { Button } from './ui/button';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';


const CalenderPageHeader = () => {
    const router = useRouter();
  return (
    <div className='w-full p-3 px-8 flex items-center justify-between bg-secondary pt-6 text-pretty text-primary-foreground'>
        <p>Calender</p>
        <Button onClick={() => {
                router.push("/api/google/connect");
            }}> <IconBrandGoogle className='mr-2'/> Connect to Google Calendar</Button>
    </div>
  )
}

export default CalenderPageHeader
