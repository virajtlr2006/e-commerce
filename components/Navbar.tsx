'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div>
            {/* Navbar */}
            <nav className="flex justify-between p-4 border-b">

                {/* Name of E-commerce onclick it redirects us to home page(/) */}
                <Link href="/">E-Commerce</Link>

                <div className="flex gap-4">

                    {/* Show if the user is not signed yet */}
                    <SignedOut>
                        <Link href="/sign-in">Login</Link>
                        <Link href="/sign-up">Signup</Link>
                    </SignedOut>

                    {/* Shows user profile icon if user is Logged In */}
                    <SignedIn>
                        <Link href="/cart">Cart</Link>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </div>
    )
}

export default Navbar