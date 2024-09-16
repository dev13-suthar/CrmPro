import SideBarDash from '@/components/SideBarDash'
import React from 'react'

const layout = ({children}:{
    children:React.ReactNode
}) => {
  return (
        <SideBarDash>
            {children}
        </SideBarDash>
  )
}

export default layout