"use client"
import { Plus, PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { useRef, useState } from "react"
import SmallLoader from "./ui/smallLoader"
import { addNewDoc } from "@/actions/vault.actions"



// const MAX_UPLOAD_SIZE = 1024 * 1024 * 6; // 6MB

const addDocSchema = z.object({
    file:z.instanceof(File),
    name:z.string(),
});

type addDocSchemaType = z.infer<typeof addDocSchema>


const AddDocsForm = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFileName, setselectedFileName] = useState("");
    const [isLoading, setisLoading] = useState(false);

    const form = useForm<addDocSchemaType>({
        resolver:zodResolver(addDocSchema),
        defaultValues:{
            file:undefined,
            name:""
        }
    });

    const handleSUbmit = async(v:addDocSchemaType)=>{
        const formData = new FormData();
        formData.append('file', v.file);
        try {
            setisLoading(true);
            const response = await fetch('/api/upload/docs', {
                method: 'POST',
                body: formData,
              });
        
            const data = await response.json();
            setisLoading(false);
            if(data.url){
                const url:string = data.url
               toast.promise(addNewDoc({url:url,name:v.name}),{
                loading:"Adding...Hold Tight",
                success:(data)=>{
                    return `${data.message}`
                },
                error:'Error'
               })
            }else{
                toast.error("Errro while Uploading")
            }
        } catch (error) {
            console.log(error);
        }finally{
            setisLoading(false);
        }
        form.reset();
        setselectedFileName("");
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
                <Button>
                <span className="flex gap-2">
                    <PlusCircle/>
                    Add Doc
                </span>
                </Button>
        </DialogTrigger>
        <DialogContent>
             <Form {...form}>
                <form className="flex flex-col items-center justify-center gap-2" onSubmit={form.handleSubmit(handleSUbmit)}>
                     <FormField
                     control={form.control}
                     name="file"
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
                     render={({field:{value,onChange,...fieldProps}})=>(
                        <FormItem className="flex items-center justify-center flex-col gap-2">
                            <FormLabel   id="fileUpload">Choose File to Upload</FormLabel>
                            <FormControl>
                                <div className="h-32 w-32 flex items-center justify-center rounded-md bg-primary/15" onClick={()=>inputRef.current?.click()}>
                                        <span className="cursor-pointer"><Plus/></span>
                                    <Input className="hidden" hidden type="file" {...fieldProps} ref={inputRef} id="fileUpload" onChange={(event)=>{
                                        if(event.target.files &&  event.target.files.length>=0){
                                            onChange(event.target.files[0]);
                                            setselectedFileName(event.target.files[0].name)
                                        }
                                    }}/>
                                </div>
                            </FormControl>
                            <FormDescription>{selectedFileName && <p>{selectedFileName}</p>}</FormDescription>
                        </FormItem>
                     )}
                     />
                     <FormField
                     control={form.control}
                     name="name"
                     render={({field})=>(
                        <FormItem className="flex items-center justify-center flex-col">
                            <FormLabel>Add Document Name</FormLabel>
                            <FormControl>
                                <Input required type="text" placeholder="Enter Document Name" {...field}/>
                            </FormControl>
                        </FormItem>
                     )}
                     />
                    <Button type="submit" disabled={selectedFileName.length<=1?true:false || isLoading} className="mt-2 w-full flex gap-1">
                    {isLoading && <SmallLoader/>}    
                    Upload</Button>
                </form>
             </Form>
        </DialogContent>
    </Dialog>
  )
}

export default AddDocsForm
