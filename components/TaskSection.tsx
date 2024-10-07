"use client"
import { additonalType } from '@/actions/tasks.actions'
import React, { Suspense, useState } from 'react'
import AddTask from './AddTask'
import TaskList from './TaskList'

const TaskSection = ({initTasks}:{initTasks:additonalType[]}) => {
    const [tasks, settasks] = useState<additonalType[]>(initTasks)
  return (
    <>
      <div className='flex w-[80%] p-3 border border-blue-400  rounded-lg flex-col items-center justify-center'>
        <Suspense fallback={<p>Loadinmg.g.g.g</p>}>
        <AddTask setTasks={settasks}/>
        <TaskList tasks={tasks} settasks={settasks}/>
        </Suspense>
      </div>
    </>
  )
}

export default TaskSection