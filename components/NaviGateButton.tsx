"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

const NaviGateButton = ({title,href}:{title:string,href:string}) => {
    const router = useRouter();
  return (
    <Button onClick={()=>router.push(`${href}`)}>
        {title}
    </Button>
  )
}

export default NaviGateButton