"use client"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { CalendarClockIcon, LogOut, NotebookPen, Search, Settings, UserCircle2Icon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import EditProfileSheet from "./EditProfileSheet"
import { ModeToggle } from "./ModeToggle"


const WORSPACE_CONST = [
  {
    name: "People",
    href: "/objects/people",
    icon: (<UserCircle2Icon className="size-[1.2rem]" />)
  },
  {
    name: "Calender",
    href: "/objects/calender",
    icon: (<CalendarClockIcon className="size-[1.2rem]" />)
  },
  { 
    name: "Tasks",
    href: "/objects/tasks",
    icon: (<NotebookPen className="size-[1.2rem]" />)
  },
  {
    name: "FAQ",
    href: "#",
    icon: (<QuestionMarkCircledIcon className="size-[1.2rem]" />)
  }
]



const SideBarDash = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session = useSession();
  const pathName = usePathname();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed h-screen w-[180px] bg-secondary p-1 pt-6 flex flex-col gap-6 flex-shrink-0">
        {/* Header */}
        <section className="mt-3 flex flex-col gap-5">
          <header className="text-[13px] flex items-center gap-3">
            <div className="size-10 rounded-full bg-purple-700" />
            <p>{session.data?.user.name}</p>
          </header>

          {/* Menu Items */}
          <div className="flex flex-col gap-2">
            <span className="flex gap-3 cursor-pointer py-1 items-center pl-5 hover:bg-purple-500 rounded-md">
              <Search size={"1.2rem"} />
              <p className="text-[0.9rem]">Search</p>
            </span>
            <span className="flex gap-3 cursor-pointer py-1 items-center pl-5 hover:bg-purple-500 rounded-md">
                <EditProfileSheet/>
            </span>
            <span onClick={()=>{signOut()}} className="flex gap-3 py-1 items-center pl-5 hover:bg-purple-500 rounded-md cursor-pointer">
              <LogOut size={"1.2rem"} />
              <p>Logout</p>
            </span>
            <span  className="flex gap-3 py-1 items-center pl-3 hover:bg-purple-500 rounded-md cursor-pointer">
              <ModeToggle/>
              <p>Mode</p>
            </span>
          </div>

          {/* Workspaces */}
          <div className="mt-4 p-1">
            <p className="font-semibold text-secondary-foreground mb-4">Workspace:</p>
            <div className="p-1 flex flex-col gap-4">
              {WORSPACE_CONST.map((i) => (
                <div
                  key={i.name}
                  onClick={() => router.push(`${i.href}`)}
                  className={`flex gap-3 cursor-pointer py-1 items-center pl-3 transition-all duration-150 hover:pl-4 hover:border-4 hover:border-l-purple-600 border-t-0 border-r-0 border-b-0 ${i.href===pathName?'pl-4 border-4 border-l-primary':''}`}
                >
                  {i.icon}
                  <p>{i.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Main content area */}
      <div className="ml-[180px] flex-1 overflow-auto h-full">
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default SideBarDash
