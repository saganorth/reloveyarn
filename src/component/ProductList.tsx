import React, { FC } from 'react';
import { Products } from '../models/product';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

type ProductListProps = {
  products: Products[];
};

const ProductList: FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <div  key={product.id} className="m-4 w-64 rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
            <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg relative">
              <Link href={`/products/${product.category}/${product.id}`}>
                <div aria-label={`View details for ${product.namn}`} className="block hover:bg-gray-200">
                  <img src={product.imageUrl} alt={product.namn} width={500} height={300} className="w-full mb-4" style={{ flexGrow: 1 }} />
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "'Caveat', cursive" }}>{product.namn}</h3>
                    <p className="text-gray-600">${product.pris}</p>
                  </div>
                </div>
              </Link>
              <button onClick={() => addToCart(product)}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 text-sm bg-purple-200 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded-full">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 
export default ProductList;