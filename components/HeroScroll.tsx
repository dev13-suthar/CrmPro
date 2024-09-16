import React from 'react'
import { ContainerScroll } from './ui/ContainerScroll'
import Image from 'next/image'

const HeroScroll = () => {
  return (
    <div className='flex flex-col overflow-hidden'>
        <ContainerScroll
        titleComponent={<>
            <h1 className='text-3xl font-semibold text-muted-foreground'>Built With NextJS</h1>
        </>}
        >
            <Image
            src={"/heroImg.png"}
            alt='Hero'
            height={1500}
            width={1200}
            className="mx-auto rounded-2xl object-cover w-full h-full object-left-top"
            />
        </ContainerScroll>
    </div>
  )
}

export default HeroScroll