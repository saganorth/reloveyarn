import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-purple-200 py-4">
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Site Title */}
        <div className="flex items-center justify-start">
          <Link href="/">
            <div className="text-xl font-semibold text-purple-600 hover:text-purple-800">ReLoveYarn</div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-10">
          <Link href="/Product">
            <div className="text-lg text-purple-600 hover:text-purple-800">Shop</div>
          </Link>
          <Link href="/about">
            <div className="text-lg text-purple-600 hover:text-purple-800">About Us</div>
          </Link>
        </div>

        {/* Cart Icon */}
        <div className="flex items-center justify-end">
          <Link href="/cart">
            <div className="text-purple-600 hover:text-purple-800">
              <i className="fas fa-shopping-cart text-3xl"></i>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
