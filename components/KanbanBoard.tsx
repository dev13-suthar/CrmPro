/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import { Boardcolumns } from "@/constants/boardColumns"
import ColumnContainer from "./ColumnContainer"
import {DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors} from '@dnd-kit/core'
import {arrayMove, SortableContext} from '@dnd-kit/sortable'
import { useEffect, useState } from "react"
import { Columns } from "@/types/common"
import { createPortal } from "react-dom"
import { additonalType, deleteTaskById, getAllTasks, updateTaskStatus } from "@/actions/tasks.actions"
import { useSession } from "next-auth/react"
import TaskCard from "./TaskCard"
import ColumnContainerV2 from "./ColumnContainerV2"

enum TaskStatus {
  Todo = "Todo",
  InProgress = "InProgress",
  Completed = "Completed"
}

const KanbanBoard = () => {
    const [columns, setcolumns] = useState<Columns[]>(Boardcolumns);
    const session = useSession();
    const [tasks, settasks] = useState<additonalType[] | []>([]);
    const [activeCol, setactiveCol] = useState<Columns | null>(null);
    const [activeTask, setactiveTask] = useState<additonalType | null>(null)
    useEffect(()=>{
        const getTask = async()=>{
            const tasks = await getAllTasks({workSpaceId:session.data?.user.workSpaceId??1});
            if(tasks.status){
              settasks(tasks.additional!!)
            }
        };
        getTask()
    },[])
    const colsId = columns.map((c)=>c.id);
    // For Deleting Task from Kanban board
    const handleDeleteTask = async(id:number)=>{
      settasks(tasks.filter((tak)=>tak.id !== id));
      await deleteTaskById({id:id});
    }
    const sensor = useSensors(
      useSensor(PointerSensor,{
          activationConstraint:{
              distance:4
          }
      })
    );

    const OnDragStart = (e:DragStartEvent)=>{
      // console.log(e)
      if(e.active.data.current?.type==="Column"){
          setactiveCol(e.active.data.current?.col);
          return;
      }
      if(e.active.data.current?.type==="Task"){
        setactiveTask(e.active.data.current?.task);
      }

    }
    const OnDragEnd = (event:DragEndEvent)=>{
        setactiveCol(null);
        setactiveTask(null);
        const {active,over} = event;
        if(!over) return;
        const activeColId = active.id;
        const overColId = over.id;
        if(activeColId === overColId) return;
        setcolumns(columns=>{
            const activeColIndex = columns.findIndex(col=>col.id === activeColId);
            const overColIndex =  columns.findIndex(col=>col.id===overColId);
            return arrayMove(columns,activeColIndex,overColIndex)
        })
    }
    const onDragOver = (event:DragOverEvent)=>{
      const {active,over} = event;
      if(!over) return;

      const activeId = active.id;
      const overId = over.id;
      if(activeId === overId) return;

      const isActiveATask = active.data.current?.type=== "Task";
      const isOverATask = over.data.current?.type=== "Task";
      if(!isActiveATask) return;

      // Dropping task over another Task;
      if(isActiveATask && isOverATask){
        settasks(tasks=>{
            const activeIndex = tasks.findIndex((t)=>t.id===activeId);
            const overIndex = tasks.findIndex((t)=>t.id===overId);
            if(tasks[activeIndex].staus !== tasks[overIndex].staus){
              tasks[activeIndex].staus = tasks[overIndex].staus;
              updateTaskStatus({taskId:tasks[activeIndex].id,status:tasks[overIndex].staus})
            }
            return arrayMove(tasks,activeIndex,overIndex)
        })
      }

      const isOverAColumn = over.data.current?.type === "Column";
      if(isActiveATask && isOverAColumn){
          settasks(tasks=>{
              const activeIndex = tasks.findIndex((t)=>t.id === activeId);
              let newStatus: TaskStatus | undefined;
        
        switch (overId) {
            case "Todo":
                newStatus = TaskStatus.Todo;
                break;
            case "InProgress":
                newStatus = TaskStatus.InProgress;
                break;
            case "Completed":
                newStatus = TaskStatus.Completed;
                break;
            default:
                console.warn(`Unknown status: ${overId}`);
                return tasks; // Return unchanged tasks if status is unknown
        }
              tasks[activeIndex].staus = newStatus;

              updateTaskStatus({taskId:tasks[activeIndex].id,status:newStatus})  
              return arrayMove(tasks,activeIndex,activeIndex);
          })
      }
      // Droping task over column
    }
  return (
    <div className='w-full h-full flex gap-4 items-center justify-center p-0 md:p-0'>
        <DndContext onDragStart={OnDragStart} onDragEnd={OnDragEnd} sensors={sensor} onDragOver={onDragOver}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 w-[90%] border p-1">
            <SortableContext items={colsId}>
            {columns.map((c)=>(
                <ColumnContainerV2 handleDeleteTask={handleDeleteTask} key={c.id} col={c} tasks={tasks?.filter((t)=>t.staus===c.id)}/>
            ))}
            </SortableContext>
        </div>
       {createPortal(<DragOverlay>
            {activeCol && <ColumnContainerV2 handleDeleteTask={handleDeleteTask} col={activeCol} tasks={tasks?.filter((t)=>t.staus===activeCol.id)}/>}
            {activeTask && <TaskCard handleDeleteTask={handleDeleteTask} task={activeTask}/>}
        </DragOverlay>,document.body
      )}
        </DndContext>
    </div>
  )
}

export default KanbanBoard