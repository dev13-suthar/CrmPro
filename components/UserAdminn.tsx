"use client"
import { getAdminUser } from '@/states/PeopleAtoms'
import React from 'react'
import { useRecoilValueLoadable } from 'recoil'

const UserAdminn = () => {
    const adminUser = useRecoilValueLoadable(getAdminUser(9));
    console.log(adminUser.contents);

    if(adminUser.state==="loading"){
        return "loadinggg..."
    }
  return (
    <div>
        {JSON.stringify(adminUser.contents)}
    </div>
  )
}

export default UserAdminn
