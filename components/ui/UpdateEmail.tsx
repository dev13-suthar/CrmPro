"use client"
import { updateEmailSchema, updateEmailSchemaType } from "@/types/apiTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./form";
import { Input } from "./input";
import { Button } from "./button";
import { generateAndSendUpdateEmailToken } from "@/actions/user.actions";
import { toast } from "sonner";

const UpdateEmail = () => {
    const form = useForm<updateEmailSchemaType>({
        resolver:zodResolver(updateEmailSchema),
        defaultValues:{
            email:""
        }
    });
    const name = form.watch();
    const handleSubmit = async(values:updateEmailSchemaType)=>{
        const res = await generateAndSendUpdateEmailToken({email:values.email});
        if(res.status){
            toast.success(res.message)
        }else{
            toast.error(res.message)
        }
        form.reset();
    }
  return (
     <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
            control={form.control}
            name="email"
            render={({field})=>(
                <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                        className="w-full"
                        placeholder="Should be Users Defualt Email"
                        {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
            />
            {name.email.length>1 && (
                <Button type="submit">Save</Button>
            )}
        </form>
     </Form> 

  )
}

export default UpdateEmail
