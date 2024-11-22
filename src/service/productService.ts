

export async function getProductById(category: string, id: string) {
    const response = await fetch(`http://localhost:3000/api/products/${category}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  }
  
