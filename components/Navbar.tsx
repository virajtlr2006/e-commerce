'use client'

import { useCartStore } from '@/app/store/cartStore'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const Navbar = () => {

    const totalItems = useCartStore((state) => state.totalItems())

    return (
        <div>
            {/* Navbar */}
            <nav className="flex justify-between p-4 border-b">

                {/* Name of E-commerce onclick it redirects us to home page(/) */}
                <Link href="/">E-Commerce</Link>

                <div className="flex gap-4">

                    <Link href="/products">All Products</Link>
                    
                    {/* Show if the user is not signed yet */}
                    <SignedOut>
                        <Link href="/sign-in">Login</Link>
                        <Link href="/sign-up">Signup</Link>
                    </SignedOut>

                    {/* Shows user profile icon if user is Logged In */}
                    <SignedIn>
                        {/* Shows total cart items in Navbar */}
                        <Link href="/cart">Cart({totalItems})</Link>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </div>
    )
}

export default Navbar