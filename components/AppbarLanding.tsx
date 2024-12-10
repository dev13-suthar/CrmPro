import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const AppbarLanding = () => {
  return (
    <>
     {/* AppBar */}
     <nav className="p-4 flex items-center justify-between px-5 border-b-2 shadow-md sticky w-full shadow-purple-400">
            <div className="text-2xl font-bold">
                <p className="tracking-wider">
                    C
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Link href={"/"}>Features</Link>
                <Link href={"/"}>Contact</Link>
                <Link href={"/"}>About Us</Link>
                <Link href={"/"}>Github</Link>
            </div>
            <div className="flex gap-8">
                
                <Link href={"/signup"}>
                    <Button>Start Trial</Button>
                </Link>
            </div>
        </nav>
    </>
  )
}

export default AppbarLanding
