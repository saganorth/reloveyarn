import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../models/product';

type CartItem = Product & {
  quantity: number;
};

const CartContext = createContext({
  cartItems: [] as CartItem[],
  addToCart: (product: Product) => {},
  removeFromCart: (productId: string) => {}, // Assuming IDs are strings
  calculateTotal: () => 0,
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((currentItems) => {
      const isProductInCart = currentItems.some((item) => item.id === product.id);
      if (isProductInCart) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return currentItems.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          return currentItems.filter((item) => item.id !== productId);
        }
      }
      return currentItems;
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // Assuming the correct property is `price`
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
