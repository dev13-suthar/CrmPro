"use client"

import { updateToNewEmail } from "@/actions/user.actions";
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";

const ChangeEmail = () => {
    const params = useSearchParams();
    const token = params.get("token");
    // const router = useRouter();
    if(!token){
        return "no token FOudn  sorru"
    }
  return (
    <div className="py-20">
        <div className="max-w-screen-sm w-full flex flex-col items-center justify-center mx-auto gap-2">
            <p className="text-2xl">Click on Verify to Update Your Email</p>
            <Button onClick={()=>{
                toast.promise(updateToNewEmail({token:token}),{
                    loading:"Wait while We Update your Email",
                    success:(data)=>{
                        return `${data.message}`
                    },
                    error:()=>{
                        return `Error WHile Updating!`
                    }
                })
            }}>Verify</Button>
        </div>
    </div>
  )
}

export default ChangeEmail
