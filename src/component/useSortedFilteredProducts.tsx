import { useMemo } from 'react';
import { Product } from '../models/product';

interface UseSortedFilteredProductsParams {
  products: Product[];
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
  
    
    if (category !== 'All') {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }
  
    
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.namn.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
   
    filteredProducts = filteredProducts.filter((product: Product) =>
      product.namn && product.namn.toLowerCase().includes(searchQuery.toLowerCase()));
  console.log("Filtered Products by Category:", filteredProducts);
console.log("Filtered Products by Search:", filteredProducts);

    
    switch (sortOrder) {
      case 'latest':
        filteredProducts.sort((a: Product, b: Product) => b.id - a.id);
        break;
      case 'price':
        filteredProducts.sort((a: Product, b: Product) => a.pris - b.pris);
        break;
      case 'priceDesc':
        filteredProducts.sort((a: Product, b: Product) => b.pris - a.pris);
        break;
      default:
        break;
    }
  
    return filteredProducts;
  }, [products, sortOrder, searchQuery, category]);
  
    return sortedAndFilteredProducts;
  }
  


export default useSortedFilteredProducts;