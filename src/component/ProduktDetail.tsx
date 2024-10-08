import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <Image src={product.imageUrl} alt={product.name} width={500} height={500} className="rounded-lg" />
        <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
        <p className="text-xl text-gray-700 mt-2">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mt-4">{product.description}</p>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of products to generate paths
  const res = await fetch('https://your-api-endpoint/products');
  const products: Product[] = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://localhost/products/${params?.id}`);
  const product: Product = await res.json();

  return { props: { product } };
};

export default ProductDetail;