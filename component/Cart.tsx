import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, calculateTotal } = useCart();
  const total = calculateTotal();

  return (
    <div className="bg-gray-100 p-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-800">{item.name}</span>
              <span className="text-gray-600">${item.pris}</span>
              <span className="text-sm text-gray-500">x {item.quantity}</span>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Remove one
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="text-lg font-semibold text-gray-800 mt-4">Total: ${total.toFixed(2)}</p>
      <div className="flex space-x-4 mt-6">
        <Link href="/checkout">
          <div className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">Proceed to Checkout</div>
        </Link>
        <Link href="/">
          <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors">Continue Shopping</div>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
