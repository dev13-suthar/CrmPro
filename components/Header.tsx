"use client"

import { PlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { AddCustomer } from "@/actions/user.actions"
import { Pepoles } from "@/types/common"
import { usePathname, useRouter } from "next/navigation"
import { IconBrandGoogle } from "@tabler/icons-react"


const Header = ({icon,title,SetdispPeople}:{
    icon:React.ReactNode,
    title:string|React.ReactNode,
    SetdispPeople?:any,
}) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Company, setCompany] = useState("");
  const [showDialog, setshowDialog] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const handleCLick = async()=>{
      try {
        const newCustomer =   await AddCustomer({Name,Email,Phone,Company});
        if(newCustomer.status){
          const newCust = newCustomer.additional;
          SetdispPeople((ppl:Pepoles[])=>[...ppl,newCust])
        }
      } catch (error:any) {
            console.error('Error adding customer:', error);
      }finally{
        setshowDialog(false);
        setCompany("");
        setName("");
        setPhone("");
        setEmail("")
      }
      
  }
  return (
    <div className='w-full p-3 px-8 flex items-center justify-between bg-secondary pt-6 text-pretty text-primary-foreground'>
        <section className='flex items-center gap-3 text-secondary-foreground'>
                {icon}
                <p className='text-[0.9rem] text-secondary-foreground font-bold'>{title}</p> 
            </section>
            
            {pathName==="/objects/people" && (
                <Dialog open={showDialog}>
                <DialogTrigger onClick={()=>setshowDialog(true)}><PlusIcon className='size-4'/></DialogTrigger>
                <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Customer</DialogTitle>
                </DialogHeader>
                  <div className="flex flex-col items-center justify-center gap-4">
                      <Input placeholder="Enter Name" value={Name} onChange={(e)=>setName(e.target.value)}/>
                      <Input placeholder="Enter Email" value={Email} onChange={(e)=>setEmail(e.target.value)}/>
                      <Input placeholder="Enter Phone" value={Phone} onChange={(e)=>setPhone(e.target.value)}/>
                      <Input placeholder="Enter Company" value={Company} onChange={(e)=>setCompany(e.target.value)}/>
                  </div>
                  <DialogFooter>
                    <Button  onClick={handleCLick}>Save changes</Button>
                    <Button variant="ghost" onClick={() => setshowDialog(false)}>
                    Close
                  </Button>
                  </DialogFooter>
                </DialogContent>
            </Dialog>
            )}
    </div>
  )
}

export default Header