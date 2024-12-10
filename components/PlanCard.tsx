import { Check, X } from 'lucide-react'
import React from 'react'

interface planCardProps{
    title:string,
    supportedFeatures:string[],
    nonsupportedFeatures?:string[],
    pricePerMonth:number|string,
    actionButton?:React.ReactNode
}

const PlanCard = ({title,supportedFeatures,nonsupportedFeatures,pricePerMonth,actionButton}:planCardProps) => {
  return (
    <div className='max-w-[300px] w-full p-3 shadow-md rounded-md flex flex-col gap-4 bg-primary/10 border hover:border-purple-400 duration-75 transition-all'>
        <p className='text-xl font-semibold tracking-wide'>{title}</p>
        <p className='text-2xl font-bold tracking-wide'>${pricePerMonth}<span className='text-xl text-muted-foreground'>/month</span></p>
        <div className='flex flex-col gap-2 px-2'>
            {/* Supported Features List */}
            {supportedFeatures.map((i,index)=>(
                <div key={index} className='flex gap-1 items-center'>
                    <Check className='text-green-500'/>{i}
                </div>
            ))}
            <div className='mt-2 flex flex-col gap-2'>
                {nonsupportedFeatures?.map((i,index)=>(
                    <div key={index} className='flex gap-1 items-center'>
                    <X className='text-red-500'/>{i}
                </div>
                ))}
            </div>
        </div>
        <div className='w-full'>
                {actionButton}
        </div>
    </div>
  )
}

export default PlanCard
