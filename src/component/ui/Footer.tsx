import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-300 via-fuchsia-200 to-rose-300 text-white py-8 mt-auto shadow-lg">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        {/* Brand Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-3xl font-extrabold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]">
            ReLoveYarn
          </h3>
          <p className="text-sm font-semibold opacity-90">All about crocheted love & sustainability</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-1 text-lg font-bold">
          <Link href="/shop" className="hover:underline drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
            Shop
          </Link>
          <Link href="/about" className="hover:underline drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
            About Us
          </Link>
          <Link href="/faq" className="hover:underline drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
            FAQ
          </Link>
          <Link href="/contact" className="hover:underline drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
            Contact
          </Link>
        </div>

        {/* Social Media */}
        <div className="mt-6 md:mt-0 flex space-x-6 text-2xl">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm opacity-80 mt-6">
        © {new Date().getFullYear()} ReLoveYarn - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
