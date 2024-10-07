"use client"
import { additonalType } from '@/actions/tasks.actions'
import { Columns } from '@/types/common'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import {CSS} from "@dnd-kit/utilities"
import React, { useMemo } from 'react'
import TaskCard from './TaskCard'

const ColumnContainerV2 = ({col,tasks,handleDeleteTask}:{col:Columns,tasks:additonalType[],handleDeleteTask:(id: number) => Promise<void>}) => {
    const {setNodeRef,attributes,listeners,transform,transition,isDragging} = useSortable({
        id:col.id,
        data:{
            type:"Column",
            col
        }
    });
    const taskIds = useMemo(()=>{
        return tasks?.map(t=>t.id)
    },[tasks]);
    const style = {
        transition,
        transform:CSS.Transform.toString(transform)
    }
    if(isDragging){
        return(
            <div ref={setNodeRef}  style={style} className='flex flex-col min-h-[489px] border-2 bg-gray-500 border-rose-700 opacity-40 px-4 py-2 rounded-md w-full h-full'/>
        )
    }
  return (
    <div ref={setNodeRef} {...attributes} {...listeners}  style={style} className='h-[90vh] p-3 border-r-2 border-0 flex flex-col gap-2 overflow-y-auto'>
             <p className='font-bold text-2xl'>{col.id}</p>
        <div  className='flex flex-grow border-2 flex-col gap-2 py-4 px-2 border-muted-foreground'>
            <SortableContext items={taskIds}>
            {tasks?.map((t)=>(
                <TaskCard handleDeleteTask={handleDeleteTask} task={t} key={t.id}/>
            ))}
            </SortableContext>
        </div>
        <div>
        </div>
    </div>
  )
}

export default ColumnContainerV2
