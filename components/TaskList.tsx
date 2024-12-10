import { additonalType} from '@/actions/tasks.actions'
import Task from './Task'

const TaskList = ({tasks}:{tasks:additonalType[]}) => {
   
  return (
    <div className='w-full py-5 px-4 flex flex-col gap-3 h-[300px] overflow-y-auto tasksList'>
        {tasks.length===0 && (
            <p className='text-center mt-5 text-3xl text-muted-foreground'>No Task as of Now</p>
        )}
        {tasks.map((i)=>(
            <Task task={i} key={i.id}/>
        ))}
    </div>
  )
}

export default TaskList
