// product.ts
export type Product = {
  id: number;
  category: string;
  namn: string;         
  imageUrl: string;
  beskrivning: string;   
  mått: string;          
  pris: number;         
};

export interface CartItem extends Product {
  quantity: number;
};


