'use client'

import React from 'react'
import { useCartStore } from '../store/cartStore'
import { IndianRupee } from 'lucide'
import { IndianRupeeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ProductCard'

const page = () => {

  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  if (items.length === 0) {
    return <div>Your Cart is empty</div>
  }

  return (
    <div>
      {/* Cart Items are mapped Here */}
      {items.map((i) => (

        <div key={i.id}>
          <div>
            <h3>{i.name}</h3>
            <p><IndianRupeeIcon />{i.price}</p>
          </div>
          <input
            type="number"
            min={1}
            value={i.quantity} 
            // Update the quantit
            onChange={(e) => updateQuantity(i.id, Number(e.target.value))}
          />
          {/* Remove item from cart */}
          <Button className="text-red-500" onClick={() => removeItem(i.id)}>
            Remove
          </Button>
        </div>
      ))}

      {/* SHow total price of the items present in cart */}
      <h2 className="text-xl font-bold">
        Total: ₹{totalPrice()}
      </h2>
    </div>
  )
}

export default page