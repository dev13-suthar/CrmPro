"use client"

import { deleteTaskById } from "@/actions/tasks.actions"
import { TrashIcon } from "lucide-react"

const DeleteTaskTrash = ({taskId}:{taskId:number}) => {
  return (
    <>
        <span className='absolute top-4 right-3 cursor-pointer transition-all duration-100'><TrashIcon onClick={async()=>{
            deleteTaskById({id:taskId})
       }} className="text-red-400"/></span> 
    </>
  )
}

export default DeleteTaskTrash
