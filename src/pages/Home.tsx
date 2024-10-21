import React, { useState, useEffect } from 'react';
import { Products } from '../models/product';
import Image from "next/image";

const HomePage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [cart, setCart] = useState<Products[]>([]);
  const [error, setError] = useState<string>("");
  const assetBaseUrl = "http://localhost:3000/";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${assetBaseUrl}api/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        const allProducts = [...data.filtar, ...data.mössor, ...data.väskor, ...data.balaklava];
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 2)); // Display only 2 products
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Products) => {
    console.log("Adding to cart:", product); // Debug: log the product being added
    setCart(prevCart => {
      const updatedCart = [...prevCart, product];
      console.log("Current cart contents:", updatedCart); // Debug: log the new cart state
      return updatedCart;
    });
  };

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

      <div className="container mx-auto p-5">
        <div className="flex flex-wrap justify-around">
          {products.map((product) => {
            const imageUrl = `${assetBaseUrl}${product.imageUrl.startsWith('/') ? product.imageUrl.slice(1) : product.imageUrl}`;
            return (
              <div key={product.id} className="m-4 w-64">
                <div className="overflow-hidden shadow-lg bg-white p-5 flex flex-col justify-between rounded-lg border border-pink-300" style={{ height: '400px' }}>
                  <Image src={imageUrl} alt={product.namn} width="500" height="300" className="w-full mb-4 rounded-lg" />
                  <div className="text-center" style={{ fontFamily: "'Caveat', cursive" }}>
                    <span className="font-bold text-xl text-pink-800">{product.namn}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-3 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-700 transition duration-300"
                    style={{ margin: '10px auto 0 auto' }} // Center button and add more vertical space
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
