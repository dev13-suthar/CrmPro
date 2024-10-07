'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Rocket, Star, Moon, Sun } from "lucide-react"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setemail] = useState("demo@gmail.com");
  const [password, setpassword] = useState("demo@1234");
  const router = useRouter();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    const res = await signIn("credentials",{
        email:email,
        password:password,
        redirect:false
    })
    if(!res?.error){
      router.push("/objects/people");
    }else{
      console.log("Errrror")
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center`}>
      <div className={`w-full max-w-md p-8 space-y-8 bg-secondary rounded-lg shadow-lg relative overflow-hidden transition-colors duration-300`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="star absolute h-1 w-1 bg-yellow-200 rounded-full animate-twinkle"></div>
          <div className="star absolute h-1 w-1 bg-yellow-200 rounded-full animate-twinkle" style={{top: '20%', left: '80%', animationDelay: '0.5s'}}></div>
          <div className="star absolute h-1 w-1 bg-yellow-200 rounded-full animate-twinkle" style={{top: '50%', left: '10%', animationDelay: '1s'}}></div>
          <div className="star absolute h-1 w-1 bg-yellow-200 rounded-full animate-twinkle" style={{top: '70%', left: '90%', animationDelay: '1.5s'}}></div>
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <div className="text-center">
            <Rocket className={`h-12 w-12 mx-auto ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} animate-bounce`} />
            <h2 className={`mt-6 text-3xl font-extrabold text-primary`}>
              Mission Control Login
            </h2>
            <p className={`mt-2 text-sm text-secondary-foreground`}>
              Just click Button with prefiiled details for Checking Demo
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm  space-y-5">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                  required
                  className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} relative rounded-t-md`}
                  placeholder="Space Cadet Email"
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} relative rounded-b-md`}
                  placeholder="Secret Launch Codes"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Star className="h-5 w-5 text-blue-300 group-hover:text-blue-200" aria-hidden="true" />
                </span>
                Initiate Launch Sequence
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}