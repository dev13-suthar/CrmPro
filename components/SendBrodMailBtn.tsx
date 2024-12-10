"use client"

import { IconMailShare } from "@tabler/icons-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useForm } from "react-hook-form"
import { sendBrodCastMailSchema, sendBrodCastMailType } from "@/types/mailsInput.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { toast } from "sonner"
import { SendBrodCastMail } from "@/actions/mails.actions"
import { ServerActionReturnType } from "@/types/apiTypes"

const SendBrodMailBtn = () => {
    const form = useForm<sendBrodCastMailType>({
        resolver:zodResolver(sendBrodCastMailSchema),
        defaultValues:{
            subject:"",
            displayName:"",
            message:"",
        }
    });
    const handleSubmit = async(values:sendBrodCastMailType)=>{
         toast.promise(SendBrodCastMail({subject:values.subject,message:values.message,displayName:values.displayName}),{
            loading:"Sending Maillss..",
            success:(data)=>{
                return `${data.message}`
            },
            error:(data:ServerActionReturnType)=>{
                return `${data.message}`
            }
         });
         form.reset();
    }
  return (
    <Dialog>
        <DialogTrigger>
        <IconMailShare/>
            {/* <Button><IconMailShare/></Button> */}
        </DialogTrigger>
        <DialogContent>
        <DialogTitle>
            Send BrodCast Mail
        </DialogTitle>
            <Form {...form}>
                <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                    control={form.control}
                    name="displayName"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                                <Input
                                placeholder="Enter DisplayName For Mail"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="subject"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input
                                placeholder="Whats the Purpose of Mail: Subject"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="message"
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <Textarea
                                placeholder="Write Your Message Here"
                                cols={10}
                                rows={5}
                                {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Send Mail</Button>
                </form>
            </Form>
            <DialogFooter>
                <Button variant={"ghost"} onClick={()=>{
                    form.reset();
                }}>Reset Fields</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default SendBrodMailBtn
