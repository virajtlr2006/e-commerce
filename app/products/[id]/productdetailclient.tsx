'use client'

import { CartItem, useCartStore } from '@/app/store/cartStore'
import { IndianRupeeIcon } from 'lucide-react'
import { useState } from 'react'

const ProductDetailClient = ({p} : {p:Omit<CartItem , "quantity">}) => {
  console.log(p)
  
  const {addItem} = useCartStore()
    const [qty, setQty] = useState(1);

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">{p.name}</h1>
      <p className="text-lg"><IndianRupeeIcon/>{p.price}</p>

    <input
        type="number"
        min={1} //minimum product 1
        max={p.stock} //maximum available in stock
        value={qty} //Store quantity 
        //set the no. of quantity user want to buy
        onChange={(e) => setQty(Number(e.target.value))} 
        className="border px-2 w-20"
      />

    <button
        onClick={() =>
          addItem({...p , quantity:qty})
        }
        className="bg-black text-white px-4 py-2"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductDetailClient