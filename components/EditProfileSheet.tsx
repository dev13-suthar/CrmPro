"use client"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Input } from "./ui/input"
import { Settings } from 'lucide-react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { editAdminProfile } from "@/actions/user.actions"
import { Avatar, AvatarFallback } from "./ui/avatar"
import ConnectToCalender from "./ConnectToCalender"

const formSchema = z.object({
    username:z.string(),
})

const EditProfileSheet = () => {
        const form = useForm<z.infer<typeof formSchema>>({
            defaultValues:{
                username:""
            },
            resolver:zodResolver(formSchema)
        });

        const formSubmit = async(v:z.infer<typeof formSchema>)=>{
            await editAdminProfile({username:v.username})
        }
    return (
        <>
            <Sheet >
                <SheetTrigger className="flex gap-2 items-center">
                    <Settings size={"1.2rem"} />
                    <p className="">Settings</p>
                </SheetTrigger>
                <SheetContent side={"right"}>
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex items-center justify-center py-1">
                        <Avatar className="size-16">
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <Form {...form}>
                        <form  onSubmit={form.handleSubmit(formSubmit)} className="p-3 space-y-4">
                            <FormField
                            control={form.control}
                            name="username"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <SheetClose asChild>
                        </SheetClose>
                        </form>
                        <div className="flex items-center justify-center mt-3">
                            <ConnectToCalender/>
                        </div>
                    </Form>
                    <SheetFooter>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default EditProfileSheet