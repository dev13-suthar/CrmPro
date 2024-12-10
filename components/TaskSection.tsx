import { additonalType } from '@/actions/tasks.actions'
import React, { Suspense} from 'react'
import AddTask from './AddTask'
import TaskList from './TaskList'
import { Skeleton } from './ui/skeleton'

const TaskSection = ({initTasks}:{initTasks:additonalType[]}) => {
  return (
    <>
      <div className='flex w-[80%] p-3 border border-blue-400  rounded-lg flex-col items-center justify-center'>
        <Suspense fallback={<Skeleton className='h-3 w-full rounded-md'></Skeleton>}>
        <AddTask/>
        <TaskList tasks={initTasks} />
        </Suspense>
      </div>
    </>
  )
}

export default TaskSection