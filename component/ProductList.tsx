import React from 'react';
import { Product } from '../models/product';
import Link from 'next/link'; 

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    console.log('Products:', products); 

    if (!products || products.length === 0) {
      return <p className="text-gray-600">No products found!</p>;
    }

    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <li key={product.id} className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow">
            <Link href={`/products/${product.id}`}>
              <a className="block p-4">
                <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover object-center mb-3 rounded" />
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600">${product.pris}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    );
};

export default ProductList;
