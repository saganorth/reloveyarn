import { useMemo } from 'react';
import { Products } from '../models/product';

interface UseSortedFilteredProductsParams {
  products: Products[];
  sortOrder: string;
  searchQuery: string;
  category: string;
}

function useSortedFilteredProducts({
  products,
  sortOrder,
  searchQuery,
  category
}: UseSortedFilteredProductsParams) {

  const sortedAndFilteredProducts = useMemo(() => {
    let filteredProducts = products;
  
    // Filter by category if it's not 'All'
    if (category !== 'All') {
      filteredProducts = filteredProducts.filter((product: Products) =>
        product.category && product.category.toLowerCase() === category.toLowerCase());
    }
  
    // Filter by search query
    filteredProducts = filteredProducts.filter((product: Products) =>
      product.namn && product.namn.toLowerCase().includes(searchQuery.toLowerCase()));
    console.log("Filtered Products by Category:", filteredProducts);
    console.log("Filtered Products by Search:", filteredProducts);
    
    // Sort products
    switch (sortOrder) {
      case 'latest': // Assuming you have a timestamp or can sort by ID for latest
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case 'price':
        filteredProducts.sort((a, b) => parseFloat(a.pris) - parseFloat(b.pris));
        break;
      case 'priceDesc':
        filteredProducts.sort((a, b) => parseFloat(b.pris) - parseFloat(a.pris));
        break;
    }
    
  
    return filteredProducts;
  }, [products, sortOrder, searchQuery, category]);
  
    return sortedAndFilteredProducts;
  }
  


export default useSortedFilteredProducts;