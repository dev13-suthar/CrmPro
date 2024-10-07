"use client"
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { getPeopleOfWorkSpace } from '@/actions/user.actions'
import { Pepoles } from '@/types/common'
import { additonalType, createNewTask } from '@/actions/tasks.actions'
import { Skeleton } from './ui/skeleton'
import { toast } from 'sonner'


const createTaskSchema = z.object({
    assignee:z.string(),
    title:z.string(),
})

const AddTask = ({setTasks}:{setTasks:React.Dispatch<React.SetStateAction<additonalType[]>>}) => {
    const session = useSession();
    const [assigness, setassigness] = useState<Pepoles[]>();
    const [loading, setloading] = useState(true);
    useEffect(()=>{
        const getData = async()=>{
            setloading(true);
            const res = await getPeopleOfWorkSpace({adminId:session.data?.user.id!!});
            if(res.status){
                setassigness(res.additional);
            }
            setloading(false);
        }
        getData();
    },[session.data?.user.id]);

    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver:zodResolver(createTaskSchema),
        defaultValues:{
            assignee:"",
            title:""
        }
    });
    const submit = async(v:z.infer<typeof createTaskSchema>)=>{
       const newTask =  await createNewTask({assignee:v.assignee,title:v.title,status:"InProgress"});
       if(newTask.status){
            setTasks((task)=>[...task,newTask?.additional!!]);
            toast.success(newTask.message)
       }
       form.reset()
    }
    if(session.status==="loading"){
        return<>
            <div className='flex  flex-col gap-2 w-full p-4 '>
               <div className='flex items-center gap-2'>
               <Skeleton className='h-10 w-[70%]'/>
               <Skeleton className='h-10 w-[30%]'/>
               </div>
               <div className='flex justify-between mt-2'>
                <Skeleton className='h-7 w-[100px] rounded-sm animate-bounce'/>
                <Skeleton className='h-11 w-[300px] rounded-sm'/>
               </div>
            </div>
        </>
    }
    if(loading){
        return "loadinggg..."
    }
    if(!session.data?.user){
        redirect("/api/auth/signin")
    }
  return (
    <div className='w-full p-6 flex flex-col gap-4'>
             <Form {...form}>
                <form className='flex flex-col gap-4 w-full' onSubmit={form.handleSubmit(submit)}>
                        <div className='flex items-center gap-2'>
                        <FormField
                        control={form.control}
                        name='title'
                        render={({field})=>(
                            <FormItem className='w-[70%]'>
                                <FormLabel>Title</FormLabel>
                                <Input {...field} placeholder='Enter Task Title' className='w-[100%]'/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name='assignee'
                        render={({field})=>(
                            <FormItem className='w-[30%]'>
                                <FormLabel>Assignees</FormLabel>
                                <FormControl>
                                <Select value={field.value.toString()} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Assignees" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        loading?<Skeleton className='w-[130px] rounded-md h-4'/>:(
                                        assigness?.map((i)=>(
                                            <SelectItem value={i.id.toString()} key={i.id}>{i.name}</SelectItem>
                                        ))
                                        )
                                    }
                                </SelectContent>
                                </Select>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        </div>
                        <div className='flex justify-between items-center'>
                            <Button type='submit' className='w-max'>Add task</Button>
                        </div>
                </form>
             </Form>  
    </div>
  )
}

export default AddTask