'use client'

import ProductCard from '@/components/ProductCard'
import { products } from '../data/products'

const page = () => {
  return (
    <div className='p-10'>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} />
        ))}
      </div>
    </div>
  )
}

export default page