import CalenderPage from '@/components/CalenderPage'
import CalenderPageHeader from '@/components/CalenderPageHeader'
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

// Create redis service and cache the events
const Calender = async() => {
  const server = await getServerSession(authOptions);
  if(!server?.user.id || !server){
      redirect("/")
  }
  return (
    <div className='w-full'>
        <CalenderPageHeader/>
        <CalenderPage/>
    </div>
  )
}

export default Calender