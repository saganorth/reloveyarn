
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import ProductDetail from '../../../component/ProduktDetail';
import Header from '../../../component/ui/Header';
import Footer from '../../../component/ui/Footer';
import { Product } from '../../../models/product';

interface ProductPageProps {
  product: Product | null;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      const normalizedProducts = [].concat(...Object.keys(data).map(key => 
        data[key].map((product) => ({ ...product, category: key }))
      ));
      setProducts(normalizedProducts);
    } catch (error: any) {
      setError(`Failed to fetch products: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">{error}</div>;
  }

  if (!product) {
    return <div className="container mx-auto p-4">Product not found.</div>;
  }

  return (
    <>
      <div 
        className="bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${product?.category === 'mössa' || product?.category === 'balaklava' ? '/idwinter.png' : '/flower.png'})` 
        }}
      >
      <Header />
      <button 
          onClick={() => window.history.back()} 
          style={{ 
            color: 'white',
            border: 'none',
            fontSize: '40px',
            cursor: 'pointer',
            background: 'none'
          }}
        >
          ← 
        </button>
      <ProductDetail product={product} assetBaseUrl="" handleAddToCart={undefined} />
      </div>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3000/api/products');
  const productsByCategory = await response.json();

  const paths = Object.entries(productsByCategory).flatMap(([category, products]) =>
    (products as Product[]).map(product => ({
      params: { category, id: `${product.id}` },
    }))
  );

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const { category, id } = params as { category: string; id: string };
  const response = await fetch(`http://localhost:3000/api/products`);
  const data = await response.json();

  const product = data[category]?.find((p: Product) => p.id.toString() === id) || null;

  return {
    props: {
      product,
    },
    revalidate: 60, 
  };
};

export default ProductPage;
