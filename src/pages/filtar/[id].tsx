// pages/[category]/[id].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { Products } from '../../models/product';
import Image from "next/image";
interface ProductProps {
  product: Products | null;
}

const ProductDetail: NextPage<ProductProps> = ({ product }) => {
  // If the product is null, show a not found message
  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{product.namn}</h1>
      
      <p className="text-lg">{product.beskrivning}</p>
      <p className="text-sm">{product.mått}</p>
      <p className="font-bold">${product.pris}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [
      { params: { category: 'filtar', id: '1' } },
      { params: { category: 'mössor', id: '1' } },
      // More paths can be added here
    ],
    fallback: 'blocking'  // Set to 'blocking' for better SEO and user experience
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { category, id } = context.params!;
  try {
    const response = await fetch(`http://localhost:3000/api/products/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    const product = data.find((p: Products) => p.id.toString() === id);

    return {
      props: {
        product: product || null,
      },
    };
  } catch (error) {
    console.error('Failed to fetch product data', error);
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductDetail;
