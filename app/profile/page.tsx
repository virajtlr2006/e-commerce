'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    redirect("/sign-in")
  }
  
  return (
    <div>Profile Page</div>
  )
}

export default page