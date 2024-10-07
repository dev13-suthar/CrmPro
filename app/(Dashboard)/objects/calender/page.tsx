import CalenderPage from '@/components/CalenderPage'
import CalenderPageHeader from '@/components/CalenderPageHeader'
import React from 'react'


const Calender = () => {
  return (
    <div className='w-full'>
        <CalenderPageHeader/>
        <CalenderPage/>
    </div>
  )
}

export default Calender