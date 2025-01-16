import React from 'react';
import Image from 'next/image';
import{useCart} from '../context/CartContext';
import { Product } from '../models/product';
import { useState } from 'react';


interface ProductDetailProps {
  product: Product;
  assetBaseUrl: string;
  handleAddToCart: (product: Product) => void;
}

function isAbsoluteURL(url: string) {
  return /^https?:\/\//i.test(url);
}
const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  if (!product) {
    return <div className="text-center text-2xl font-bold text-red-500 mt-10">Product not found</div>;
  }
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const baseDomain = process.env.NEXT_PUBLIC_IMAGES_BASEURL ?? 'http://localhost:3000';
  const imageUrl = isAbsoluteURL(product.imageUrl)
  ? product.imageUrl
  : `${baseDomain.replace(/\/$/, '')}/${product.imageUrl.replace(/^\//, '')}`;
  
  const handleAddToCart = () => {
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Hide the popup after 2 seconds
  };


  return (
    <div className="relative bg-cover bg-center p-10">
      <div className="max-w-4xl mx-auto p-7 bg-purple-100 shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="flex-shrink-0 mb-6 md:mb-0 relative bg-white p-4 shadow-xl rounded-lg" style={{ width: 'fit-content' }}>
            <div className="bg-white border border-gray-300 p-2 shadow-lg transform transition duration-500 hover:scale-105">
            <Image
      src={imageUrl}
      alt={product.namn}
      width={400}
      height={400}
    />
            </div>
            <div className="mt-2 text-center text-xl font-bold text-gray-800">{product.namn}</div>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="text-4xl font-bold mb-6 text-gray-900 text-center">{product.pris ? `${product.pris.toFixed(2)} kr` : 'N/A'}</div>
            <p className="text-lg mb-8 text-gray-600 leading-loose italic text-center">{product.beskrivning}</p>
            <button
              onClick={handleAddToCart} // <-- Call the function
              className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl"
            >
              Add to Cart 👜
            </button>
          </div>
        </div>
        {showPopup && (
  <div className="fixed top-16 right-4 bg-pink-500 text-white px-4 py-2 rounded shadow-md z-50 transition-transform duration-300 flex flex-col items-center space-y-2">
    <Image
      unoptimized={true}
      src="/dancing.gif"
      alt="the gif"
      height={200}
      width={200}
    />
    <div className="flex items-center space-x-2">
      <span role="img" aria-label="sparkles">✨</span>
      <p>Yas girl! Item added to cart!</p>
      <span role="img" aria-label="sparkles">✨</span>
    </div>
  </div>
)}
        <div className="mt-12 text-center text-lg text-gray-500 italic">
          "Discover the uniqueness of our collection, designed to bring elegance and comfort to your everyday life."
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
