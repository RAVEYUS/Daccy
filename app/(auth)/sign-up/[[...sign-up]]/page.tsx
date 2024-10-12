import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='flex  h-screen justify-center w-full items-center'>
        <SignUp/>
    </main>
  )
}
export  default SignUpPage