import React from 'react';
import { NextPage } from 'next';
import { Product } from '../models/product';
import { useCart } from '../context/CartContext';




type ProductDetailProps = {
    product: Product;
  };
  
  const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const { addToCart } = useCart(); 
    if (!product) {
      return <p className="text-gray-600">Produkten hittades inte.</p>;
    }
  
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg" 
          />
          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-2">${product.pris}</p>
            <p className="text-gray-500 mb-4">{product.beskrivning}</p>
            <p className="text-gray-500">Mått: {product.mått}</p>
          </div>
        </div>
        <button 
        onClick={() => addToCart(product)} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Lägg till i varukorgen
      </button>
      </div>
    );
  };
  
  export default ProductDetail;
