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
      className="min-h-screen text-gray-800"
      style={{
        background: 'url(/vinterbg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-4xl font-bold text-center text-violet-900 py-10">
       Vinter Accessories
      </h1>

      {/* En enkel sökruta och sortering om du vill */}
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded text-gray-800"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 rounded text-gray-800"
        >
          <option value="latest">Latest</option>
          <option value="price">Lowest Price</option>
          <option value="priceDesc">Highest Price</option>
        </select>
      </div>

      <div className="container mx-auto p-5">
        <div className="flex flex-wrap justify-center">
          <ProductList
            products={sortedAndFilteredProducts}
            assetBaseUrl={undefined}
            handleAddToCart={undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default VinterPage;
