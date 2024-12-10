"use client"
import {  ResetPasswordAction } from '@/actions/mails.actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetPassSchema, resetPassSchemaType } from '@/types/apiTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'




const ForgotPassword = () => {
    const form = useForm<resetPassSchemaType>({
        resolver:zodResolver(resetPassSchema),
        defaultValues:{
            email:""
        }
    });
    const handleSubmit = async(values:resetPassSchemaType)=>{
          const res =   await ResetPasswordAction({email:values.email});
          console.log(res);
    }
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-20'>
        <Card className='max-w-screen-sm w-full mx-auto h-[max] border mt-10'>
            <CardHeader>
                <p className='text-2xl'>Reset Password</p>
                <span className='text-muted-foreground p-0 m-0'>we&apos;ve got u coverd!!</span>
            </CardHeader>
            <CardContent className='flex flex-col items-center justify-center py-7'>
                <Form {...form}>
                <form action="" className='space-y-3 w-[60%]' onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                    control={form.control}
                    name='email'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter your Email' {...field} className='w-full'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <Button type='submit' className='w-full'>Send me Reset Password Email</Button>
                </form>
                </Form> 
            </CardContent>
        </Card>
    </div>
  )
}

export default ForgotPassword
