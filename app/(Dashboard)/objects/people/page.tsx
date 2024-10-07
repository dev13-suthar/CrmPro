import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import PeoplePage from '@/components/PeoplePage';
import { getPeopleOfWorkSpace } from '@/actions/user.actions';
import { redirect } from 'next/navigation';


const People = async() => {
  const server = await getServerSession(authOptions);
  if(!server?.user.id || !server){
      redirect("/")
  }
  const peoples = await getPeopleOfWorkSpace({adminId:server.user.id})
   return (
       <div className='h-max'>
          <PeoplePage peoples={peoples}/>
       </div>
  )
}

export default People