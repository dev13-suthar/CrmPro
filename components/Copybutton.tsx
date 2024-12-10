"use client"
import { Copy } from 'lucide-react'
import React, { useState } from 'react'


const Copybutton = ({text}:{
    text:string
}) => {
    const [copied, setcopied] = useState(false);
   const handleClick = ()=>{
        setcopied(true);
        navigator.clipboard.writeText(text);
        setTimeout(() => {
           setcopied(false) 
        }, 2000);
   }
  return (
    <div className='cursor-pointer' onClick={handleClick}>
        {copied ? <p>Copied</p>:<Copy/>}
    </div>
  )
}

export default Copybutton
