import React, { useState, useEffect } from 'react'
import { getProducts } from '../services/products'

interface Product {
  id: number
  name: string
  imageUrl: string
  price: number
  description: string
  category: string
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)




  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await getProducts()
        setProducts(response)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])
 


  return (
    <>
    <div className="product-main-container">
        <div className="product-grid-container">
          {loading ? (
            <h1>Loading...</h1>
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-grid-item">
                <img  className="img" src={product.imageUrl} alt={product.name} />
                <div className="product-grid-item-info">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <h3>${product.price}</h3>
                    <button className="btn">Add to Cart</button>
                </div>
              </div>
            ))
          )}
        </div>
    </div>
    </>
  )
}