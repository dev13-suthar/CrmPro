"use client"
import { additonalType } from '@/actions/tasks.actions'
import { useSortable } from '@dnd-kit/sortable'
import { CheckCircle, Trash2, UserRoundCheckIcon } from 'lucide-react'
import {CSS} from "@dnd-kit/utilities"
import React, { useState } from 'react'

const TaskCard = ({task,handleDeleteTask}:{task:additonalType,handleDeleteTask:(id: number) => Promise<void>}) => {
    const [isMouseOver, setisMouseOver] = useState(false);
    const {setNodeRef,attributes,listeners,transform,transition,isDragging} = useSortable({
        id:task.id,
        data:{
            type:"Task",
            task
        }
    });
    const style = {
        transition,
        transform:CSS.Transform.toString(transform)
    }
    if(isDragging){
        return(
            <div
            ref={setNodeRef}
            style={style}
            className='p-3 border-red-500 h-14 bg-primary w-full rounded-md opacity-35'
            />
        )
    }
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style} className='p-3 h-max hover:ring-inset bg-secondary rounded-md hover:ring-2 hover:ring-primary flex flex-col gap-2 justify-center transition-all duration-300' onMouseEnter={()=>{setisMouseOver(true)}} onMouseLeave={()=>{setisMouseOver(false)}}>
        <p className='font-semibold flex items-center gap-2'><CheckCircle className={`${task.staus==='Completed'?'text-green-500':''}`}/> {task.title}</p>
        <div className='flex gap-1 items-center text-[12px] text-muted-foreground justify-between'>
            <span className='flex items-center gap-3'><UserRoundCheckIcon className='size-4'/> {task.assginee.name}</span>
            {isMouseOver && (<Trash2 onClick={()=>{handleDeleteTask(task.id)}}/>)}
        </div>
    </div>
  )
}

export default TaskCard