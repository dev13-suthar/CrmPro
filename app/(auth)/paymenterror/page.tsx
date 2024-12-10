import AppBar from '@/components/AppBar'
import { Button } from '@/components/ui/button'
import React from 'react'

const PayMentError = () => {
  return (
    <div>
        <AppBar/>
        <div className='py-20 max-w-sm w-full flex flex-col mx-auto'>
            <p className='text-2xl font-semibold tracking-wide text-center'>Oops!! Your Payment Was Not Successful</p>
            <Button>Go Back to Home Page</Button>
        </div>
    </div>
  )
}

export default PayMentError
