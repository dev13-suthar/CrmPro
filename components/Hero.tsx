"use client"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import {motion} from "framer-motion"
import { HoverBorderGradient } from './ui/borderGradient'

const Hero = () => {
  return (
    <>
        <div className="px-4 pt-28 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative pb-20">
            <div className="flex items-center justify-center w-full mb-1">
            <HoverBorderGradient className="w-full items-center justify-center">
                  version.1.0
            </HoverBorderGradient>
            </div>
            <div className="flex flex-col items-center justify-center">
                  <motion.span  
                  style={{perspective:"200px"}}
                  className="flex flex-col items-center justify-center">
                  <motion.h1  
                  initial={{transform:'rotateX(37deg)'}}
                  animate={{transform:'rotateX(0deg)'}}
                  transition={{ ease: "linear", duration: 0.2}}
                  className="text-4xl md:text-6xl font-bold mb-4">Supercharge Your </motion.h1>
                  <motion.h1 
                  initial={{transform:'rotateX(37deg)'}}
                  animate={{transform:'rotateX(0deg)'}}
                  transition={{ ease: "linear", duration: 0.2, delay:0.1}}
                  className="text-4xl md:text-6xl font-bold mb-8">Customer Relationship</motion.h1>
                  </motion.span>
                  <motion.div
                  initial={{transform:'translateY(60px)',opacity:0}}
                  animate={{transform:'translateY(0)',opacity:1}}
                  transition={{ease:"easeInOut",duration:0.32}}
                  >
                    <motion.p 
                    className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl text-center font-mono tracking-tighter">
                      Streamline your customer interactions, boost sales, and grow your business with our powerful CRM solution.
                    </motion.p>
                  </motion.div>
                  <div className="flex items-center gap-4 mt-4">
                        <Link href={"/signup"}>
                            <Button className="p-5 py-6 w-[180px] shadow-inner flex items-center gap-1" size={"lg"}><ArrowRight className="size-4"/>Start Free Trial</Button>
                        </Link>
                  </div>  
            </div>
            <motion.span 
            initial={{transform:'translateY(-540px) rotate(0deg)',opacity:0,}}
            animate={{transform:'translateY(0) rotate(15deg)',opacity:1}}
            transition={{ease:"linear",duration:0.5,delay:1}}
            className="p-3 bg-orange-400 w-[150px] rounded-md absolute bottom-0 left-6 text-center">
                Manage Tasks
            </motion.span>
            <motion.span 
            initial={{transform:'translateY(-540px) rotate(0deg)',opacity:0,}}
            animate={{transform:'translateY(0) rotate(-15deg)',opacity:1}}
            transition={{ease:"linear",duration:0.5,delay:1.2}}
            className="p-3 bg-primary w-[150px] rounded-md absolute bottom-20 left-20 text-center">
                Kanban Board
            </motion.span>
            <motion.span 
            initial={{transform:'translateY(-540px) rotate(0deg)',opacity:0,}}
            animate={{transform:'translateY(0) rotate(15deg)',opacity:1}}
            transition={{ease:"linear",duration:0.5,delay:1.5}}
            className="p-3 bg-primary-foreground text-secondary w-[150px] rounded-md absolute bottom-40 left-10 text-center">
                Track customers
            </motion.span>
        </div>
    </>
  )
}

export default Hero
