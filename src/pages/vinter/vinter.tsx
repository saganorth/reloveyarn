import React, { useState, useEffect, FC } from 'react';
import ProductList from '../../component/ProductList';
import { Product } from '../../models/product';
import useSortedFilteredProducts from '../../component/useSortedFilteredProducts';

const VinterPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('latest');

  // Hämta produkterna från ditt API
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();

      // Normalisera (platta ut) listan och sätt en property "category" på varje produkt.
      const normalizedProducts: Product[] = [].concat(
        ...Object.keys(data).map((key) =>
          data[key].map((product: Product) => ({
            ...product,
            category: key,
          }))
        )
      );

      // Filtrera så att vi endast tar med mössor och balaklava
      const vinterProducts = normalizedProducts.filter(
        (prod) => prod.category === 'mössor' || prod.category === 'balaklava'
      );

      setProducts(vinterProducts);
    } catch (error: any) {
      setError(`Failed to fetch products: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const sortedAndFilteredProducts = useSortedFilteredProducts({
    products,
    sortOrder,
    searchQuery,
    category: 'All',  
                     
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className="min-h-screen text-gray-800 bg-pink-100"
    >
      <section
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/vinter.png')` }}
      ></section>
      <div className="sticky top-0 z-10 bg-pink-50/80 backdrop-blur-md border-b border-pink-200 shadow-sm">
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 rounded-full border border-pink-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              >
                <option value="latest">Latest First</option>
                <option value="price">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-5">
        <div className="flex flex-wrap justify-center">
          <ProductList
            products={sortedAndFilteredProducts}
            assetBaseUrl={undefined}
            handleAddToCart={undefined} />
        </div>
      </div>
    </div>
  );
}

export default VinterPage;
