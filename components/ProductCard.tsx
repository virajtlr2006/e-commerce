'use client'

import { SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import { useCartStore } from '@/app/store/cartStore'
import { IndianRupeeIcon } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/db/schema'

const ProductCard = ({products}:{products:Product[]}) => {
  // Use addItem state to add Item
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div>
      {products.map((p) => (
        /* Added return/parenthesis for the map function */
        <div key={p.id}>
          {/* Display Product Name */}
          <h3>{p.name}</h3>
          <p><IndianRupeeIcon size={16} />{p.price}</p>

          {p.stock === 0 && (
            <p className='text-red-500 text-sm'>Out of Stock</p>
          )}

          <div className="flex gap-2">
            <Link
              href={`/products/${p.id}`}
              className="underline text-sm"
            >
              View
            </Link>
            
          </div>
          {/* If User is SignedIn then user can add cart items */}
          <SignedIn>
            <Button
              /* In onclick function product details and quantity is given */
              onClick={() => addItem({ ...p, quantity: 1})}
              className="mt-2 bg-black text-white px-4 py-2"
            >
              Add To Cart
            </Button>
          </SignedIn>

          {/* If User is not there, user must login to add cart items */}
          <SignedOut>
            <p className="text-sm text-gray-500">
              Login to add items to cart
            </p>
          </SignedOut>
        </div>
      ))}
    </div>
  )
}

export default ProductCard