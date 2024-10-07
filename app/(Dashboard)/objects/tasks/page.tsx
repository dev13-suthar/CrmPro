import { getAllTasks } from '@/actions/tasks.actions'
import Header from '@/components/Header'
import NaviGateButton from '@/components/NaviGateButton'
import TaskSection from '@/components/TaskSection'
import { authOptions } from '@/lib/authOptions'
import { PenIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Tasks = async() => {
    const server = await getServerSession(authOptions);
    
    if (!server?.user.id || !server) {
        console.log("No valid session, redirecting to signin");
        redirect("/api/auth/signin")
    }

    if (!server?.user.workSpaceId) {
        console.error("No workSpaceId found in user session");
        return <div>Error: Unable to fetch tasks. Workspace not found.</div>
    }

    const tasks = await getAllTasks({ workSpaceId: server.user.workSpaceId });
    if(!tasks.status || !tasks.additional){
        return <div>ERror {tasks.message}</div>
    };
  return (
    <div className=''>
        <Header title="Tasks" icon={<PenIcon className='size-[1rem]'/>}/>
        <div className='p-4 flex items-center justify-center w-full'>
            <div className='w-full border  h p-5 flex flex-col gap-2'>
                <section className='flex items-center justify-between'>
                    <div>
                        <p className='text-4xl font-bold tracking-widest'>Tasks</p>
                        <p className='text-xs p-1'>Manage your tasks</p>
                    </div>
                    <div>
                        <NaviGateButton title='Go to Board' href='/objects/tasks/board'/>
                    </div>
                </section>
                <div className='flex items-center justify-center w-full h-full mt-10'>
                    <TaskSection initTasks={tasks.additional}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tasks