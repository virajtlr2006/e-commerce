'use client'

import { SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'

const ProductCard = () => {
  return (
    <div>

      {/* Display Product Name */}
      <h3>Product Name</h3>

      {/* If User is SignedIn then user can add cart items */}
      <SignedIn>
        <Button className="mt-2 bg-black text-white px-4 py-2">
          Add To Cart
        </Button>
      </SignedIn>

      {/* If User is not there , user must have to login to add cart items */}
      <SignedOut>
        <p className="text-sm text-gray-500">
          Login to add items to cart
        </p>
      </SignedOut>

    </div>
  )
}

export default ProductCard