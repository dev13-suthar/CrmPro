"use client"
import { additonalType, deleteTaskById } from '@/actions/tasks.actions'
import { TrashIcon, UserIcon } from 'lucide-react'
import React, { useState } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

const TaskList = ({tasks,settasks}:{tasks:additonalType[],settasks:React.Dispatch<React.SetStateAction<additonalType[]>>}) => {
    const deleteTasks = (id:number)=>{
        settasks(tasks.filter((t)=>t.id!==id))
    }
   
  return (
    <div className='w-full py-5 px-4 flex flex-col gap-3 h-[300px] overflow-y-auto tasksList'>
        {tasks.length===0 && (
            <p className='text-center mt-5 text-3xl text-muted-foreground'>No Task as of Now</p>
        )}
        {tasks.map((i)=>(
            <Task task={i} key={i.id} deleteTask={deleteTasks}/>
        ))}
    </div>
  )
}

export default TaskList

const Task = ({task,deleteTask}:{task:additonalType,deleteTask:(id: number) => void})=>{
    const [isMouseOver, setisMouseOver] = useState(false)
    return(
       <div onClick={async()=>{
            deleteTask(task.id);
            deleteTaskById({id:task.id})
       }} className='grid grid-cols-3 p-2 bg-secondary rounded-md px-10 items-center relative' onMouseEnter={()=>{setisMouseOver(true)}}
       onMouseLeave={()=>{setisMouseOver(false)}}
       >
            <p>{task.title}</p>
            {isMouseOver && <span className='absolute top-4 right-3 cursor-pointer transition-all duration-100'><TrashIcon color='red'/></span>}
            <div className='flex justify-center'>
                <HoverCard>
                    <HoverCardTrigger asChild>
                    <Button variant="link">{task.staus}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className='w-96'>
                    <div className="flex gap-2   space-x-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/vercel.png" />
                            <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">@{task.assginee.name}</h4>
                            <p className="text-sm">
                                <span className='font-semibold text-primary'>TODO : </span>{task.title}
                            </p>
                            <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground w-full">
                                Duedate: <>{task?.dueDate?.toDateString() || new Date().getUTCDate()}/{new Date().getMonth()}</>
                            </span>
                            </div>
                        </div>  
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <section className='grid grid-cols-2 gap-5 items-center'>
                <div className='flex justify-end items-center'>
                <UserIcon/>
                </div>
                <p className=''>{task.assginee.name}</p>
            </section>
       </div>
    )
}