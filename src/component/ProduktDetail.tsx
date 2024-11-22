// components/ProductDetail.tsx
import React from 'react';
import { Product } from '../models/product';
import Image from 'next/image';

interface ProductDetailProps {
  product: Product | null;
}

const assetBaseUrl = 'https://localhost:3000/';

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  if (!product) {
    return <p className="text-center mt-10 text-xl">Product not found.</p>;
  }

  return (
    <div className="bg-lightpurple p-5 shadow-lg rounded-lg my-5 mx-auto max-w-4xl">
      <div className="bg-white p-5 border border-gray-200 shadow-lg rounded-lg relative" style={{ maxWidth: '300px' }}>
        <Image
          src={`${assetBaseUrl}${product.imageUrl.startsWith('/') ? product.imageUrl.slice(1) : product.imageUrl}`}
          alt={product.namn}
          width={284}
          height={284}
          className="rounded-md"
        />
        <div className="text-center mt-3">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.namn}
          </h3>
        </div>
      </div>
      <div className="mt-5">
        <p className="mt-1 text-gray-500">{product.beskrivning}</p>
        <p className="text-lg mt-2"><span className="font-bold">Mått:</span> {product.mått}</p>
        <p className="text-lg mt-1"><span className="font-bold"></span> {product.pris}kr</p>
      </div>
    </div>
  );
};

export default ProductDetail;
