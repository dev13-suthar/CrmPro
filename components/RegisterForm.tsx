"use client"

import { FormEvent, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signupUser } from "@/actions/user.actions";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sendWelcomeMail } from "@/actions/mails.actions";

const RegisterForm = () => {
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [loading, setloading] = useState(false);
    const router = useRouter();

    const submit = async(e: FormEvent<HTMLFormElement>)=>{
        try {
            setloading(true)
            e.preventDefault();
            const res = await signupUser({email:email,password:password,userName:userName});
            console.log(res);
            if(res.status){
                toast.success(res.message);
                router.push("/api/auth/signin");
                sendWelcomeMail({name:userName,to:email});
            }else{
                toast.error(res.message)
            }
            setloading(false);

        } catch (error) {
            toast.error("An Error Occured")
        }finally{
            setloading(false);
        }
    }
  return (
    <Card  className="w-[350px]">
        <CardHeader>
            <CardTitle>Crete Account</CardTitle>
            <CardDescription><Link href={"/signin"}>Already Memeber? Login</Link></CardDescription>
        </CardHeader>
        <CardContent>
            <form className="w-full flex flex-col gap-3 items-center justify-center mt-5" onSubmit={submit}>
                <Input
                value={userName}
                onChange={(e)=>setuserName(e.target.value)}
                placeholder="Enter UserName"
                className="w-[90%]"
                />
                <Input
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                placeholder="Enter email"
                className="w-[90%]"
                />
                <Input
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                placeholder="Enter Password"
                className="w-[90%]"
                />
                <Button type="submit" className="w-[90%] mt-2">{loading?"Registerring....":"Register"}</Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default RegisterForm