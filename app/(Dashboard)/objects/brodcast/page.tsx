import Header from '@/components/Header'
import SendBrodMailBtn from '@/components/SendBrodMailBtn'
import { IconBroadcast } from '@tabler/icons-react'
import React from 'react'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import UpgradToPlusModal from '@/components/ui/UpgradToPlusModal'
import { redirect } from 'next/navigation'




const BrodCastMail = async() => {
  const session = await getServerSession(authOptions);
  if(!session || !session.user){
      redirect("/");
  }
  const brodCastService = await prisma.workSpace.findFirst({
    where:{
      id:session.user.workSpaceId
    }
  });
  const blocktimeExpire = brodCastService?.blockExpires?.getDate();
  return (
    <div>
        <Header title="BrodCast" icon={<IconBroadcast/>}/>
        <div className='px-2 sm:px-5 md:px-7 max-w-screen w-full border py-8 flex justify-between items-center'>
            <div>
              <p className='text-3xl font-semibold tracking-wide'>BrodCast</p>
              <p className='text-muted-foreground'>One Click Mail Service to all Your Customers</p>
            </div>
            <div>
              <SendBrodMailBtn/>
            </div>
        </div>
        <div className='w-full h-full flex flex-col items-center justify-center py-12'>
              {blocktimeExpire && blocktimeExpire>new Date().getDate()?(
                  <div className='flex flex-col items-center justify-center gap-2'>
                      <p className='text-muted-foreground'>U have Used Your Brodcast service for these week</p>
                      <p className='text-2xl'>Your BrodCast Service will be available on {blocktimeExpire}</p>
                      <UpgradToPlusModal/>
                  </div>
              ):(
                null
              )}
        </div>
    </div>
  )
}

export default BrodCastMail
