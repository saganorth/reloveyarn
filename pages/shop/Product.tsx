import React, { useState, useEffect } from 'react';
import ProductList from '../../component/ProductList';
import { Product } from '../../models/product'; 

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error fetching products');
        }
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage;
