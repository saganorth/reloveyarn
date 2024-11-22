// pages/products/[category]/[id].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import ProductDetail from '../../../component/ProduktDetail';

// Assuming you have a Products type
import { Product } from '../../../models/product';

interface ProductPageProps {
  product: Product | null;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  if (!product) {
    return <div className="container mx-auto p-4">Product not found.</div>;
  }

  return (
    <ProductDetail product={product} />
  );
};



export const getStaticPaths: GetStaticPaths = async () => {

  const data = await fetch('http://localhost:3000/api/products');
  const productsByCategory = await data.json();

  const paths = [];

  
  for (const [category, products] of Object.entries(productsByCategory)) {
      (products as Product[]).forEach(product => {
          paths.push({
              params: { category: category, id: `${product.id}` }
          });
      });
  }

  return {
      paths,
      fallback: 'blocking' 
  };
};


// Fetch specific product data using category and id
export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const { category, id } = params as { category: string, id: string };
  const response = await fetch(`http://localhost:3000/api/products`);
  const data: Product = await response.json();

  const product = data[category]?.find(p => p.id.toString() === id) || null;

  return {
    props: {
      product
    }
  };
};

export default ProductPage;
