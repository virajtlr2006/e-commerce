'use client'

import { SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import { useCartStore } from '@/app/store/cartStore'
import { IndianRupee } from 'lucide'
import { IndianRupeeIcon } from 'lucide-react'

const ProductCard = () => {

  // Use addItem state to add Item
  const addItem = useCartStore((state) => state.addItem)

  // Dummy Product
  const product = {
    id: "1",
    name: "IPhone 17 pro max",
    price: 195000,
    image: "This is image",
  }

  return (
    <div>

      {/* Display Product Name */}
      <h3>{product.name}</h3>
      <p><IndianRupeeIcon />{product.price}</p>

      {/* If User is SignedIn then user can add cart items */}
      <SignedIn>
        <Button
          // In onclick function product details and quantity is given
          onClick={() => addItem({ ...product, quantity: 1 })}
          className="mt-2 bg-black text-white px-4 py-2">
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