import React, { useState, useEffect, FC } from 'react';
import ProductList from '../../component/ProductList';
import { Products } from '../../models/product';

interface ProductsPageProps {}

const ProductsPage: FC<ProductsPageProps> = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('latest');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Error fetching products');
        }
        const data = await response.json();
        if (data && typeof data === 'object') {
            const allProducts: Products[] = (Object.values(data) as Products[]).flat();
            setProducts(allProducts);
        } else {
            throw new Error('Products data is not in expected format');
        }
    } catch (error: any) {
        setError(`Failed to fetch products: ${error.message || error.toString()}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // Debounce for 300 ms
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const sortedAndFilteredProducts = React.useMemo(() => {
    console.log("Filtering products", { products, category, debouncedSearchQuery, sortOrder });
  
    let filteredProducts = products;
  
    if (category !== 'All') {
      filteredProducts = filteredProducts.filter(product => {
        const categoryMatch = product.category === category;
        console.log("Category Filter", { product, categoryMatch });
        return categoryMatch;
      });
    }
  
    filteredProducts = filteredProducts.filter(product => {
      const nameMatch = product.namn.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      console.log("Search Filter", { product, nameMatch });
      return nameMatch;
    });
  
    if (sortOrder === 'latest') {
      filteredProducts.sort((a, b) => b.id - a.id);
    } else if (sortOrder === 'price') {
      filteredProducts.sort((a, b) => a.pris - b.pris);
    } else if (sortOrder === 'priceDesc') {
      filteredProducts.sort((a, b) => b.pris - a.pris);
    }
  
    console.log("Sorted and Filtered Products", filteredProducts);
    return filteredProducts;
  }, [products, sortOrder, debouncedSearchQuery, category]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded text-gray-800"
        >
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
          <ProductList products={sortedAndFilteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
