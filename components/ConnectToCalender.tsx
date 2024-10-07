"use client"
import React from 'react'
import { Button } from './ui/button'
import { IconBrandGoogle } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

const ConnectToCalender = () => {
    const router = useRouter();
  return (
    <Button onClick={()=>{
        router.push("/api/google/connect")
    }}>
        <IconBrandGoogle className='mr-2'/>
        Connect to Google Calender
    </Button>
  )
}

export default ConnectToCalender
