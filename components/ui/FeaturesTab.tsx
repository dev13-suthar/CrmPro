import Image from 'next/image'
import React from 'react'

const FeaturesTab = () => {
  return (
    <div className='max-w-full  border border-blue-800 rounded-md border-dashed p-3'>
        <p className="text-3xl md:text-5xl text-muted-foreground">All the Great Feature</p>
        <div className='mt-10 mx-auto mb-0 max-w-7xl h-max p-3  grid grid-cols-1 md:grid-cols-5 gap-2'>
          <div className='md:col-span-2  shadow-lg border items-center flex justify-center transform transition-transform duration-500 ease-in-out hover:scale-105 hover:-translate-x-5 flex-col'>
                <p className='text-2xl text-primary tracking-wide'>Task Section</p>
                <Image
                  src={'/Tasks.png'}
                  alt='task'
                  height={900}
                  width={900}
                  quality={100}
                  className='h-[450px] w-[700px] object-contain' // Increase the size here
                />
            </div>
            <div className='md:col-span-3 border  transform transition-transform duration-500 ease-in-out hover:scale-105 hover:translate-x-5 flex flex-col items-center justify-center '>
            <p className='text-2xl text-primary tracking-wide'>Customer Data Table</p>
                <Image
                  src='/datatable.png'   // Use your actual image path here
                  alt='Description of image'// Describe the image for accessibility
                  height={700}
                  width={700}   
                  quality={100}            // Ensures the image covers the container without distorting aspect ratio
                  className='h-[450px] w-[700px] object-contain'
                />
            </div>
        </div>
        <div className='max-w-7xl h-max pb-3 px-3 pt-0 mx-auto flex'>
            <div className='w-full border h-[500px]  transform transition-transform duration-500 ease-in-out hover:scale-105 hover:mt-[3px] flex flex-col items-center justify-center'>
            <p className='text-2xl text-primary tracking-wide'>Connected Google Calender</p>
            <Image
                  src='/cal.png'   
                  alt='Description of image'
                  height={500}
                  width={700}  
                  quality={100}
                  className='h-[450px] w-[900px] object-contain'
                />
            </div>
        </div>
    </div>
  )
}

export default FeaturesTab
