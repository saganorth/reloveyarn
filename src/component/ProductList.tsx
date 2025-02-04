// components/ProductList.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductList = ({ products, assetBaseUrl, handleAddToCart }) => {
  return (
    <div className="flex flex-wrap justify-around">
      {products.map((product: { id: React.Key; category: any; imageUrl: string; namn: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode>; }) => (
        <div key={product.id} className="m-4 w-64 relative group">
           <Link href={`/products/${product.id}`}>
            <div className="block overflow-hidden shadow-lg bg-white p-5 flex flex-col justify-between rounded-lg border border-white" style={{ height: '400px' }}>
              <Image
                src={`${assetBaseUrl}${product.imageUrl.startsWith('/') ? product.imageUrl.slice(1) : product.imageUrl}`}
                alt={String(product.namn)}
                width={500}
                height={300}
                className="w-full mb-4 rounded-lg"
              />
              <div className="text-center">
                <span className="font-bold text-xl">{product.namn}</span>
              </div>
                <button
                onClick={() => handleAddToCart(product)}
                className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-700 transition duration-300 mt-auto absolute bottom-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 flex items-center"
                >
                 <FontAwesomeIcon icon={faShoppingCart} />
                </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
