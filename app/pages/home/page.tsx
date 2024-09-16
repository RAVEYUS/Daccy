
import FloatingNavDemo from '@/components/Navbar/Navbaraccertinity'
import PlaceholdersAndVanishInputDemo from '@/components/placehoderacer/placeholderacertinity'
import Link from 'next/link'

import React from 'react'

const page = () => {
  return (
    <div className=''>
       <Link href="/pages/code" passHref>click to go to the code page</Link>
      <FloatingNavDemo/>
      
    </div>
  )
}

export default page