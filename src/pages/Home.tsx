import React, { useState, useEffect } from 'react';
import { Products } from '../models/product'; 
import Image from "next/image";
const HomePage = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        // Merge products from all categories into a single array
        const allProducts = [...data.filtar, ...data.mössor, ...data.väskor, ...data.balaklava];
        // Shuffle the array and pick the first ten items
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 10)); // Now limiting to 10 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="bg-violet-200 text-white">
      {/* Large Image Section */}
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('filt.jpeg')" }}>
        <div className="flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "'ACTlove', sans-serif" }}>Välkommen till Min Webbshop</h1>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto p-5">
        <div className="flex flex-wrap justify-around">
        {products.map((product) => (
  <div key={product.id} className="m-4 w-64">
    <div className="overflow-hidden shadow-lg bg-white p-5 flex flex-col justify-between" style={{height: '350px'}}>
      {/* Use a regular img tag temporarily to check if it resolves the issue */}
      <Image src={product.imageUrl} alt={product.namn} width="500" height="300" className="w-full mb-4" style={{flexGrow: 1}} />
      <div className="text-center" style={{ fontFamily: "'Caveat', cursive" }}>
        <span className="font-bold text-xl text-gray-800">{product.namn}</span>
      </div>
    </div>
  </div>
))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
