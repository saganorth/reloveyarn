
import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, calculateTotal } = useCart();
  const total = calculateTotal();

  return (
    <div className="flex flex-col min-h-screen bg-pink-100 p-4">
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg ">
      <h1 className="text-2xl font-bold mb-4 text-center text-pink-700">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {cartItems.map(item => (
            <li key={item.id} className="py-4 flex items-center space-x-4">
              <img src={item.imageUrl} alt={item.namn} className="h-20 w-20 object-cover rounded-lg" />
              <div className="flex-grow flex flex-col justify-between">
                <span className="text-lg font-medium text-gray-800">{item.namn}</span>
                <span className="text-gray-600">{item.pris.toFixed(2)} kr</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{item.pris.toFixed(2)} kr</span>
            </li>
          ))}
          <li className="pt-4">
            <strong className="text-lg">Total:</strong>
            <span className="float-right text-lg font-bold">{total.toFixed(2)}kr</span>
          </li>
        </ul>
      )}
      <button className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors text-center">Checkout</button>
    </div>
  </div>
  );
};

export default Cart;
