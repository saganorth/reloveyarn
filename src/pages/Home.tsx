// components/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../models/product';
import ProductList from '../component/ProductList';
import Link from 'next/link';


const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  // Bas-URL för att hämta data
  const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL || "http://localhost:3000/";

  // Hämta slumpade produkter från /api/products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${assetBaseUrl}api/products`);
        if (!response.ok) throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        const data = await response.json();

        // Slå ihop all data till en array med kategori
        const allProducts = [
          ...(data.filtar?.map(item => ({ ...item, category: 'filtar' })) || []),
          ...(data.mössor?.map(item => ({ ...item, category: 'mössor' })) || []),
          ...(data.väskor?.map(item => ({ ...item, category: 'väskor' })) || []),
          ...(data.balaklava?.map(item => ({ ...item, category: 'balaklava' })) || []),
        ];

        // Fisher-Yates shuffle algorithm
        const shuffleArray = (array: Product[]) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        const shuffled = shuffleArray(allProducts);
        setProducts(shuffled.slice(0, 2)); 
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, [assetBaseUrl]);

  // Funktion för att lägga till produkt i kundvagnen
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // Ex: du kan även visa en timeout som gömmer notisen igen
  };

  return (
    <main className="bg-violet-100 text-gray-800 min-h-screen flex flex-col">
    



      {/* 3. Hero / Top section */}
      <section
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/vinter.png')` }}
      >
        <Link href="/vinter">
          <div className="absolute inset-0"></div>
        </Link>
      </section>

    
      {error && (
        <div className="text-center text-red-600 p-4">{error}</div>
      )}
     

 

   
      <section className="py-8 px-4 bg-gradient-to-r from-pink-100 to-pink-50">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Caveat', cursive" }}>💕Featured Picks 💕 </h2>
        <div className="max-w-6xl mx-auto">
          <ProductList
            products={products}
            assetBaseUrl="http://localhost:3000" 
            handleAddToCart={handleAddToCart}
          />
        </div>
      </section>
      <section
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/10.png')` }}
      >
        <div className="absolute inset-0"></div>
      </section>

      {/* 6. Nyhetsbrev / "Sign up for updates" */}
      <section className="py-10 px-4 bg-pink-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-600" style={{ fontFamily: "'Caveat', cursive" }}>Stay in the Loop!</h2>
        <p className="mb-6 text-lg text-gray-700" >Sign up for our newsletter and get <span className="text-pink-600 font-semibold">10% off</span> your first order</p>
        <form className="flex flex-col items-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-8 rounded-full"
          >
            Sign Up
          </button>
        </form>
      </section>

      {/* 7. "Om oss" / Varumärkesberättelse */}
      <section className="py-10 px-4 bg-white text-center">
        <h2 className="text-4xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Caveat', cursive" }}>About ReLoveYarn</h2>
        <p className="max-w-4xl mx-auto">
          We believe in giving yarn a second chance. Our products are lovingly crafted from reclaimed or sustainable materials. Join us in making fashion more eco-friendly, one stitch at a time!
        </p>
      </section>


 
    </main>

  );
};


export default HomePage;
