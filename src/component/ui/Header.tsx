import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Overlay (appears when menu is open) */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

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
        relative
        z-50
        "
      >
        {/* Left Section - Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="text-2xl hover:text-gray-200 transition-colors"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Center Section - Title */}
        <div className="flex-grow text-center">
          <Link href="/">
            <h1 className="text-5xl font-extrabold cursor-pointer drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]" style={{ fontFamily: "'Caveat', cursive" }}>
              ReLoveYarn
            </h1>
          </Link>
        </div>

        {/* Right Section - Cart */}
        <div className="flex space-x-6 items-center text-2xl font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
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

      {/* Sidebar Menu */}
      <div className={`fixed top-0 left-0 w-64 h-full shadow-lg transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 bg-gradient-to-r from-pink-300 to-fuchsia-200 text-white`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800"style={{ fontFamily: "'Caveat', cursive" }}>So much to see</h2>
          <button onClick={closeMenu} className="text-gray-600 text-2xl">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <nav className="p-4 text-lg">
          <Link href="/about">
            <div className="block px-6 py-3 text-white hover:bg-gray-200 rounded cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]"style={{ fontFamily: "'Caveat', cursive" }}>About Us</div>
          </Link>
          <Link href="/form">
            <div className="block px-4 py-3 text-white hover:bg-gray-200 rounded cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]"style={{ fontFamily: "'Caveat', cursive" }}>Form</div>
          </Link>
          <Link href="/shop">
            <div className="block px-4 py-3 text-white hover:bg-gray-200 rounded cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]"style={{ fontFamily: "'Caveat', cursive" }}>Shop</div>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
