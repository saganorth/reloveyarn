import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-pink-400 text-white py-12 mt-auto shadow-lg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-5xl font-extrabold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.6)]" style={{ fontFamily: "'Caveat', cursive" }}>
              ReLoveYarn
            </h3>
            <p className="text-sm font-semibold opacity-90 mt-2 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
              All about crocheted love & sustainability
            </p>
            <div className="mt-4 flex justify-center md:justify-start space-x-6 text-2xl drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
              <a href="https://instagram.com/reloveyarn" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://facebook.com/reloveyarn" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://tiktok.com/@reloveyarn" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-4 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2 text-lg font-bold">
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
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-4 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
              Contact Us
            </h4>
            <div className="space-y-2">
              <p className="font-semibold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">Email: reloveyarn@gmail.com</p>
              <p className="font-semibold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">Location: Stockholm, Sweden</p>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-8 pt-8 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
          © {new Date().getFullYear()} ReLoveYarn - All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
