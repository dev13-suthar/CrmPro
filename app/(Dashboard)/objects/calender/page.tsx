import Header from '@/components/Header'
import { Calendar } from 'lucide-react'
import React from 'react'

const Calender = () => {
  return (
    <div className='w-full'>
        <Header title="Calender" icon={<Calendar className='size-[1rem]'/>}/>
    </div>
  )
}

export default Calender