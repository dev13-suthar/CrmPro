"use client";

import React from 'react'
import { ThemeProvider } from './ThemeProvider';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

const Provider = ({children}:{
    children:React.ReactNode
}) => {
  return (
    <>
    <SessionProvider>
      <RecoilRoot>
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </RecoilRoot>
        </SessionProvider>
    </>
  )
}

export default Provider