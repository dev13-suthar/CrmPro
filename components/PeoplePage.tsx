"use client";

import React, { useState } from 'react'
import Header from './Header';
import { UserIcon } from 'lucide-react';
import DataTable from './DataTable';
import { ServerActionReturnType } from '@/types/apiTypes';
import { Pepoles } from '@/types/common';



const PeoplePage = ({peoples}:{
  peoples: ServerActionReturnType<Pepoles[]>
}) => {
  const isSuccessResponse = peoples.status === true;
  const additionalData = isSuccessResponse ? peoples.additional : undefined;
  const [DispPeoples, setDispPeoples] = useState(additionalData)
  return (
    <>
        <div>
        <Header title="People" icon={<UserIcon/>} SetdispPeople={setDispPeoples}/>
        <DataTable peoples={additionalData!} dispPeoples={DispPeoples ?? []}/>
        </div>
    </>
  )
}
// TODO: "Make server Action for fetching Customers and store them in State Var and each time new Customer added it will trigger re render and pass that customer state to DataTable so we won;t nedd to Hard Reaload Page Each time New Customer is Added"
export default PeoplePage