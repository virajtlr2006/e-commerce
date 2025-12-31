'use client'

import React from 'react'
import ProductDetailClient from './productdetailclient'
import { useParams } from 'next/navigation'
import { useStore } from 'zustand'
import { useCartStore } from '@/app/store/cartStore'
import { useProductStore } from '@/app/store/productStore'

const page = () => {

  const {product} = useProductStore()
  const {id} = useParams()
  const FetchProductByID = product.find((p) => p.id === Number(id))

  if(!FetchProductByID) return <div>Product Not Found</div>
  return (
    <div>
      <ProductDetailClient p={FetchProductByID}/>
    </div>
  )
}

export default page