"use client";

import React, { useEffect } from 'react'
import Header from './Header';
import { UserIcon } from 'lucide-react';
import { Pepoles } from '@/types/common';
import DataTable from './DataTable';
import { useSession } from "next-auth/react"
import { useRecoilStateLoadable, useRecoilValueLoadable } from 'recoil';
import { peoplesAtom } from '@/states/PeopleAtoms';
import axios from 'axios';


const PeoplePage = () => {
  const [people,setpeople] = useRecoilStateLoadable(peoplesAtom);
  useEffect(()=>{
    const fetchData = async()=>{
      const fetchedCustomer = await axios.get("/api/people");
      const dataa = await fetchedCustomer.data.peoples;
      setpeople(dataa);
    };
    fetchData();
  },[])

  const handleAddCustomer = (newCustomer:any) => {
    setpeople((prevCustomers:any) => [...prevCustomers, newCustomer]);
  };
  const session = useSession();
  if(!session || !session.data?.user){
    return "unAuthhhh"
}

if(people.state==="loading"){
  return "loadingg..."
}

  return (
    <>
        <div>
        <Header title="People" icon={<UserIcon/>} />
        <DataTable peoples={people.contents.peoples}/>
        </div>
    </>
  )
}
// TODO: "Make server Action for fetching Customers and store them in State Var and each time new Customer added it will trigger re render and pass that customer state to DataTable so we won;t nedd to Hard Reaload Page Each time New Customer is Added"
export default PeoplePage