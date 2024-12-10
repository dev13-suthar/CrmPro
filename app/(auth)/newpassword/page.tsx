"use client"
import { changeToNewPassword } from '@/actions/user.actions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { newPasswordSchema, newPasswordSchemaType } from '@/types/apiTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'



const NewPassword = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const form = useForm<newPasswordSchemaType>({
        resolver:zodResolver(newPasswordSchema),
        defaultValues:{
            newpassowrd:"",
            confirmnewpassowrd:""
        }
    });
    const handleSUbmit = async(values:newPasswordSchemaType)=>{
        const res = await changeToNewPassword({newpassowrd:values.newpassowrd,confirmnewpassowrd:values.confirmnewpassowrd,token:token!});
        if(res.status){
            toast.success(res.message);
            router.push("/signin")
        }else{
            toast.error(res.message)
        }
        console.log(res);
    }
    if(!token){
        return "no token found"
    }
  return (
    <div className='p-20'>
        <div className='max-w-sm mx-auto mt-5 w-full  h-max border rounded-md p-3'>
            New Password
            <div className='flex flex-col items-center justify-center gap-1 w-[full] py-3'>
                <Form {...form}>
                    <form className='space-y-3' onSubmit={form.handleSubmit(handleSUbmit)}>
                    <FormField
                    control={form.control}
                    name='newpassowrd'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input
                                className='w-full'
                                placeholder='New Password'
                                {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='confirmnewpassowrd'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                className='w-full'
                                placeholder='New Password'
                                {...field}
                                /> 
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <Button type='submit' className='w-full'>Change Password</Button>
                </form>
                </Form>
            </div>
        </div>
    </div>
  )
}


const NewPasswordWithSuspense = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <NewPassword />
  </Suspense>
)

export default NewPasswordWithSuspense