import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <header
      className="
      flex
      justify-between
      items-center
      p-8
      text-white
      shadow-xl
      bg-gradient-to-r 
      from-pink-300 
      via-fuchsia-200 
      to-rose-300
      
      "
    >
      {/* Left Section - About, Form */}
      <div className="flex space-x-6 text-lg">
      <Link href="/about">
        <span className="cursor-pointer hover:underline text-2xl font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
        About Us
        </span>
      </Link>
      <Link href="/form">
        <span className="cursor-pointer hover:underline text-2xl font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
        Form
        </span>
      </Link>
      </div>

      {/* Center Section - Title */}
      <Link href="/">
      <h1 className="text-3xl font-extrabold cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">
        ReLoveYarn
      </h1>
      </Link>

      {/* Right Section - Shop and Cart */}
      <div className="flex space-x-6 items-center text-2xl font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
      <Link href="/shop">
        <span className="cursor-pointer hover:underline">
        Shop
        </span>
      </Link>
      <Link href="/cart">
        <div className="relative cursor-pointer text-2xl">
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {cartItems.length}
          </span>
        )}
        </div>
      </Link>
      </div>
    </header>
  );
};

export default Header;
