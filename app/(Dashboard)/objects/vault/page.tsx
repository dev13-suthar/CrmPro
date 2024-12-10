import { getAllDocs } from '@/actions/vault.actions';
import AddDocsForm from '@/components/AddDocsForm';
import Copybutton from '@/components/Copybutton';
import Header from '@/components/Header';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { authOptions } from '@/lib/authOptions';
import { NotebookIcon, VaultIcon } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';



export default async function FileUpload() {
  const session = await getServerSession(authOptions);
  if(!session || !session.user){
      redirect("/")
  }
  const allDocs = await getAllDocs({workspaceId:session.user.workSpaceId});
  if(!allDocs.status || !allDocs.additional){
    return "ERR"
  }

  return (
    <div>
      <Header icon={<VaultIcon/>} title="My Vault" actionButton={<AddDocsForm/>}/>
      <div className='p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          {
          allDocs.status && allDocs.additional?.length<=0?(
            <div className='max-w-screen w-[70%] mx-auto py-20 col-span-4 grid place-content-center items-center'>
                <div className='flex flex-col items-center justify-center'>
                <NotebookIcon className='size-32'/>
                No Docs in Your vault
                </div>
            </div>
          )
          :allDocs.status && allDocs.additional?.map((i)=>(
            <Card className='bg-primary-foreground/50' key={i.id}>
            <CardContent className='p-0 pb-1'>
            <div className='w-full h-[200px] relative'>
              <Image
                src="/docs.png" //very bad gotta change these shit
                layout="fill"  
                className='w-full h-full rounded-xl'  // Ensure the image adapts to the container's dimensions
                alt='PDF file'
              />
            </div>
            </CardContent>
            <CardFooter className='px-1 flex items-center gap-2 justify-between'>
                <Link  target='_blank'  href={`${i.url}`}>Link</Link> 
                <Copybutton text={i.url}/>
            </CardFooter>
            <div className='bg-primary px-2 rounded-md'>{i.name}</div>
        </Card>
          ))}
      </div>
    </div>
  );
}
