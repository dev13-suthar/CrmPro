"use client"
import { Sheet,  SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Settings, User2 } from 'lucide-react'
import { Avatar, AvatarFallback } from "./ui/avatar"
import ConnectToCalender from "./ConnectToCalender"
import Link from "next/link"
import UpdateEmail from "./ui/UpdateEmail"
import UpgradToPlusModal from "./ui/UpgradToPlusModal"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getUserwithId } from "@/actions/user.actions"
import { Skeleton } from "./ui/skeleton"



const EditProfileSheet = () => {
    const { data: session, status } = useSession(); // Destructure session and status
  const [plan, setPlan] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      if (session?.user?.id) { // Ensure session and user ID exist before calling API
        try {
          const data = await getUserwithId({ id: session.user.id });
          if (data?.status && data?.additional) {
            setPlan(data.additional.userplan?.planStatus); // Default to 0 if undefined
          } else {
            console.error('Unauthorized');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    
    getData();
  }, [session?.user?.id]);
  if(status==="loading"){
    return (
        <Skeleton className="w-full h-9 p-1 rounded-md" />
    )
  }
    return (
        <>
            <Sheet >
                <SheetTrigger className="flex gap-2 items-center">
                    <Settings size={"1.2rem"} />
                    <p className="">Settings</p>
                </SheetTrigger>
                <SheetContent side={"right"}>
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2"><User2/> User Settings</SheetTitle>
                    </SheetHeader>
                    <section className="flex flex-col grow">
                    <div className="flex flex-col gap-2 p-1 mt-5 pb-5">
                            {/* Users Basic Info */}
                            <div className="flex flex-col gap-5">
                                <Avatar>
                                    <AvatarFallback>D</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col pl-1 gap-3">
                                    <Input placeholder={`UserName`} disabled/>
                                    <UpdateEmail/>
                                </div>
                            </div>
                    </div><hr />
                    {/* Subscription */}
                    <div className="flex flex-col gap-3 mt-5 items-center justify-center pb-5">
                        {plan!=="Plus" && (
                            <Link href={"#"} className="w-full flex items-center justify-center">
                            <UpgradToPlusModal/>
                        </Link>
                        )}
                    </div>
                    {/* Services Setting */}
                    <div className="flex flex-col gap-2 mt-5">
                        <p className="text-muted-foreground">Services-</p>
                        <div className="flex items-center justify-center flex-col gap-2">
                            <ConnectToCalender/>
                            <Link className="w-[75%]" href={"/resetpassword"}>
                                <Button className="w-full">Reset Password</Button>
                            </Link>
                        </div>
                    </div>
                    </section>
                    {/* <div className="w-full flex items-center justify-between">
                        <Button variant={"destructive"}>Log-Out</Button>
                        <Button variant={"destructive"}><Trash/> Delete</Button>
                    </div> */}
                </SheetContent>
            </Sheet>
        </>
    )
}

export default EditProfileSheet