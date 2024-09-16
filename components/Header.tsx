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
import { useSetRecoilState } from "recoil"
import { peoplesAtom } from "@/states/PeopleAtoms"
import { Pepoles } from "@/types/common"

const Header = ({icon,title}:{
    icon:React.ReactNode,
    title:string|React.ReactNode,
}) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Company, setCompany] = useState("");
  const setPeoples = useSetRecoilState(peoplesAtom);
  const handleCLick = async()=>{
      try {
        const newCustomer =   await AddCustomer({Name,Email,Phone,Company});
        const newCust = newCustomer.additional;
        setPeoples((prevPeoples:any[])=>[...prevPeoples,newCust]);
      } catch (error:any) {
            console.error('Error adding customer:', error);
      }
      
  }
  return (
    <div className='w-full p-3 px-8 flex items-center justify-between bg-secondary pt-6 text-pretty text-primary-foreground'>
        <section className='flex items-center gap-3'>
                {icon}
                <p className='text-[0.9rem]'>{title}</p> 
            </section>
            {/* <Button className='p-2 py-1' onClick={onClick}>
                <PlusIcon className='size-4'/>
            </Button> */}
            <Dialog>
                <DialogTrigger><PlusIcon className='size-4'/></DialogTrigger>
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
                  </DialogFooter>
                </DialogContent>
            </Dialog>
    </div>
  )
}

export default Header