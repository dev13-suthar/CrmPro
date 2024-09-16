import DataTable from '@/components/DataTable';
import React from 'react'
import db from "@/lib/db"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import PeoplePage from '@/components/PeoplePage';


const People = async() => {
  const server = await getServerSession(authOptions);
   return (
       <div className='h-max'>
          <PeoplePage/>
       </div>
  )
}

export default People