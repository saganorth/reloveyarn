// components/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../component/ui/Header';
import { Product } from '../models/product';
import ProductList from '../component/ProductList';

const HomePage = () => {
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setNotice("Product added to cart!");
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const { addToCart } = useCart();
  const assetBaseUrl = "http://localhost:3000/";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${assetBaseUrl}api/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        const allProducts = [...data.filtar, ...data.mössor, ...data.väskor, ...data.balaklava];
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 2)); 
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);


  return (
    <main className="bg-violet-200 text-gray-800">
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('filt.jpeg')" }}>
        <div className="flex items-center justify-center h-full bg-pink-200 bg-opacity-50">
          <h1 className="text-[20rem] font-bold text-white" style={{ fontFamily: "'ACTlove', sans-serif" }}>ReLoveYarn</h1>
        </div>
      </div>

      {error && (
        <div className="text-center text-red-600">
          {error}
        </div>
      )}

      {error && (
        <div className="text-center text-red-600">
          {error}
        </div>
      )}

      {notice && (
        <div className="text-center text-green-600">
          {notice}
        </div>
      )}
      <Header/>

      <ProductList products={products} assetBaseUrl={assetBaseUrl} handleAddToCart={handleAddToCart} />
    </main>
  );
};

export default HomePage;


