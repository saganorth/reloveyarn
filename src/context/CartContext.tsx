import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Products } from '../models/product';

type CartItem = Products & {
  quantity: number;
};

const CartContext = createContext({
  cartItems: [] as CartItem[],
  addToCart: (product: Products) => {},
  removeFromCart: (productId: string) => {}, // Assuming IDs are strings
  calculateTotal: (): number => 0,
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart =  (product: Products) => {
    setCartItems(currentItems => {
      const itemExists = currentItems.find(item => item.id === product.id);
      if (itemExists) {
        // Increment quantity if item already exists
        return currentItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item to the cart
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };
  

  const removeFromCart = (productId: string) => {
    setCartItems((currentItems) => {
      return currentItems.reduce((acc, item) => {
        // Ensure both `item.id` and `productId` are strings for comparison
        if (String(item.id) === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem[]);
    });
  };
  
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.pris * item.quantity, 0);
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
function calculateTotal() {
  throw new Error('Function not implemented.');
}

