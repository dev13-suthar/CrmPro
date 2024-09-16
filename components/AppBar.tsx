"use client"

import { ModeToggle } from "./ModeToggle"

const AppBar = () => {
  return (
    <nav className="p-3 items-center justify-between px-6 flex bg-secondary">
        <div className="font-bold">
            <p className="font-mono tracking-widest text-3xl">CRM PRO</p>
        </div>
        <div className="flex gap-5 items-center">
            <ModeToggle/>
            <div className="size-10  flex items-center justify-center rounded-full bg-pink-400">
                 *
            </div>
        </div>
    </nav>
  )
}

export default AppBar