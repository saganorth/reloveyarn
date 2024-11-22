import React, { useState, useEffect, FC } from 'react';
import ProductList from '../../component/ProductList';
import { Product} from '../../models/product';
import useSortedFilteredProducts from '../../component/useSortedFilteredProducts'; // assuming the hook is exported

const ProductsPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('latest');

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
      console.log("Normalized Products:", normalizedProducts);
normalizedProducts.forEach(product => {
  console.log(`Category: ${product.category}, ID: ${product.id}`);
});
      setProducts(normalizedProducts);
    } catch (error: any) {
      setError(`Failed to fetch products: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    console.log("Normalized Products:", products);
    fetchProducts();
  }, []);

  const sortedAndFilteredProducts = useSortedFilteredProducts({ products, sortOrder, searchQuery, category });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log("Initial products:", products);
  
  
  console.log("Current Category:", category);
  console.log("Search Query:", searchQuery);
  console.log("Sort Order:", sortOrder);
  console.log("Filtered Products:", sortedAndFilteredProducts);
  return (
    <div className="bg-violet-200 min-h-screen text-gray-800">
      <h1 className="text-4xl font-bold text-center text-violet-900 py-10">Our Products</h1>
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded text-gray-800"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="All">All Categories</option>
  <option value="filtar">Filtar</option>
  <option value="mössor">Mössor</option>
  <option value="väskor">Väskor</option>
  <option value="balaklava">Balaklava</option>
</select>
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
          <ProductList products={sortedAndFilteredProducts} assetBaseUrl={undefined} handleAddToCart={undefined}/>
        </div>
      </div>
    </div>
    
  );
};

export default ProductsPage;
