export type Products = {
    category: string;
    id: number;
    namn: string;
    imageUrl: string;
    beskrivning: string;
    mått: string; 
    pris: number; 
  };
  export interface CartItem extends Products {
    quantity: number;
}

