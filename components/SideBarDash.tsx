"use client"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { CalendarClockIcon, NotebookPen, Search, Settings, UserCircle2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"


const WORSPACE_CONST = [
  {
    name:"People",
    href:"people",
    icon:(<UserCircle2Icon className="size-[1.2rem]"/>)
  },
  {
    name:"Calender",
    href:"calender",
    icon:(<CalendarClockIcon className="size-[1.2rem]"/>)
  },
  {
    name:"Tasks",
    href:"#",
    icon:(<NotebookPen className="size-[1.2rem]"/>)
  },
  {
    name:"FAQ",
    href:"#",
    icon:(<QuestionMarkCircledIcon className="size-[1.2rem]"/>)
  }


]

const SideBarDash = ({children}:{children:React.ReactNode}) => {
  const router = useRouter();

  return (
    <div className="flex h-screen">
      <div className="h-auto min-h-[110vh]  w-[160px] min-w-[180px] p-1 pt-6 flex flex-col gap-6 bg-secondary flex-shrink-0">
         {/* Headerr */}
         <section className="mt-3 flex flex-col gap-5 fixed">
         <header className="text-[13px] flex items-center gap-3">
            <div className="size-10 rounded-full bg-purple-700"/>
            <p>Dev N Suthar</p>
         </header>
         <div className="flex flex-col gap-2">
           <span className="flex gap-3 cursor-pointer py-1 items-center pl-5 hover:bg-purple-500 rounded-md">
                <Search size={"1.2rem"}/>
                <p className="text-[0.9rem]">Search</p>
            </span>
            <span className="flex gap-3 cursor-pointer py-1 items-center pl-5 hover:bg-purple-500 rounded-md">
                <Settings size={"1.2rem"}/>
                <p className="">Settings</p>
            </span>
      </div>
        {/* WorkSPaces Tab */}
        <div className="mt-4 p-1">
            <p className="font-semibold text-gray-300 mb-4">Workspace:</p>
            <div className="p-1 flex flex-col gap-4">
                {WORSPACE_CONST.map((i)=>(
                  <div key={i.name} onClick={()=>router.push(`${i.href}`)} className="flex gap-3 cursor-pointer py-1 items-center pl-3 transition-all duration-150 hover:pl-4 hover:border-4 hover:border-l-purple-600">
                    {i.icon}
                    <p>{i.name}</p>
                  </div>
                ))}
            </div>
        </div>
         </section>
      </div>
          <div className="flex-1  overflow-x-auto">
            <div className="w-full max-w-full overflow-x-auto">
              {children}
            </div>
          </div>
    </div>
  )
}

export default SideBarDash
// https://chatgpt.com/share/66e458ad-7ca4-8001-adfd-af41edd19511
// https://chatgpt.com/share/66e5166a-03a4-8001-9e63-d662dcacd76b
// https://chatgpt.com/share/66e5166a-03a4-8001-9e63-d662dcacd76b
// https://chatgpt.com/share/66e5166a-03a4-8001-9e63-d662dcacd76b
