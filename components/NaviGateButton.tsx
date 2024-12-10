import Link from "next/link"
import { Button } from "./ui/button"

const NaviGateButton = ({title,href}:{title:string,href:string}) => {

  return (
   <Link href={`${href}`}>
      <Button>
        {title}
    </Button>
   </Link> 
  )
}

export default NaviGateButton