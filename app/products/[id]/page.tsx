'use client'

import { products } from '@/app/data/products'
import React from 'react'
import ProductDetailClient from './productdetailclient'
import { useParams } from 'next/navigation'

const page = () => {
  const {id} = useParams()
  const product = products.find((p) => p.id === id)

  if(!product) return <div>Product Not Found</div>
  return (
    <div>
      <ProductDetailClient p={product}/>
    </div>
  )
}

export default page