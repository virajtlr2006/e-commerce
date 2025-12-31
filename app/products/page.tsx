'use client'

import ProductCard from '@/components/ProductCard'
import { FetchProductsAction } from '@/actions/ProductAction'
import { useEffect } from 'react'
import { useProductStore } from '../store/productStore'

const page = () => {

  const { setProducts, product: allProducts } = useProductStore()

  useEffect(() => {
    FetchAllProducts()
  }, [])

const FetchAllProducts = async () => {
    // Check if products already exist to avoid unnecessary DB calls
    if (allProducts.length === 0) {
      try {
        const products = await FetchProductsAction();
        setProducts(products);
      } catch (err) {
        console.error("Database connection failed:", err);
      }
    }
  };

  useEffect(() => {
    // console.log(product)
  }, [allProducts])


  return (
    <div className='p-10'>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allProducts.map((p) => (
          <ProductCard products={allProducts} key={p.id} />
        ))}
      </div>
    </div>
  )
}

export default page