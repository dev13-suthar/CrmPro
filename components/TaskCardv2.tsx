import { CheckCircle, User2Icon } from 'lucide-react'
import React from 'react'

const TaskCardv2 = () => {
  return (
    <div className='flex flex-col px-1 py-2 gap-2 border rounded-md h-[240px] w-full'>
        <p className='text-xl flex items-center'><CheckCircle size={17} className='mr-2 text-primary'/>TITLE</p>
        <span className='flex gap-1 items-center'>
            <User2Icon/> Admin
        </span>
    </div>
  )
}

export default TaskCardv2
