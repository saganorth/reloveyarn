import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

function isAbsoluteURL(url: string) {
  return /^https?:\/\//i.test(url);
}

const Cart = () => {
  const { cartItems, calculateTotal, removeFromCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  // Calculate totals
  const subtotal = calculateTotal();
  const donation = subtotal * 0.1;
  const finalTotal = subtotal;

  // Store details
  const storeNumber = 452;
  const cashierName = 'Saga';
  const dateString = new Date().toLocaleString();

  // If images might be relative, build full path
  const baseDomain = process.env.NEXT_PUBLIC_IMAGES_BASEURL ?? 'http://localhost:3000';
  const getImageUrl = (imageUrl: string) =>
    isAbsoluteURL(imageUrl)
      ? imageUrl
      : `${baseDomain.replace(/\/$/, '')}/${imageUrl.replace(/^\//, '')}`;

  // Handlers
  const handleCheckout = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-pink-100 p-4 flex justify-center items-start">
      {/* Main receipt content */}
      <div
        className="
          relative 
          w-full 
          max-w-lg 
          bg-white 
          px-6 
          py-4 
          text-gray-800 
          font-typewriter
          shadow-lg
        "
        style={{
          clipPath: `
            polygon(
              0% 10px, 
              10px 0%, 
              100% 0%, 
              100% calc(100% - 10px), 
              calc(100% - 10px) 100%, 
              0% 100%
            )
          `,
        }}
      >
        {/* Go Back Button */}
        <button 
          onClick={() => window.history.back()} 
          style={{ 
            color: 'black',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            background: 'none'
          }}
        >
          ← Keep Shopping
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold">ReLoveYarn 🧶</h1>
          <p className="text-sm">
            Store #{storeNumber} &middot; Cashier: {cashierName}
            <br />
            Date: {dateString}
          </p>
        </div>

        {/* Divider */}
        <hr className="border-dotted border-gray-400 mb-4" />

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-dotted divide-gray-300 mb-4">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex items-center space-x-3">
                  {/* Item image */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={getImageUrl(item.imageUrl)}
                      alt={item.namn}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>

                  {/* Item details */}
                  <div className="flex-grow">
                    <div className="font-bold">{item.namn}</div>
                    <div className="text-sm">{item.pris.toFixed(2)} kr/st</div>
                    <div className="text-sm">
                      <strong>{item.quantity}</strong> 
                    </div>
                  </div>

                  {/* Line price */}
                  <div className="px-6 text-right font-bold">
                    {(item.pris * item.quantity).toFixed(2)} kr
                  </div>

                  {/* Remove button */}
                  <button onClick={() => removeFromCart(String(item.id))}>
                    X
                  </button>
                </li>
              ))}
            </ul>

            {/* Subtotal / Donation / Total */}
            <div className="mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{subtotal.toFixed(2)} kr</span>
              </div>
              <div className="flex justify-between">
                <span>10% Donation:</span>
                <span className="text-green-600">{donation.toFixed(2)} kr</span>
              </div>
              <div className="flex justify-between border-t border-dotted border-gray-400 mt-2 pt-2">
                <span className="font-bold">Total:</span>
                <span className="font-bold">{finalTotal.toFixed(2)} kr</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="text-center">
              <button
                onClick={handleCheckout}
                className="
                  bg-black 
                  text-white 
                  px-4 
                  py-2 
                  rounded 
                  hover:bg-gray-800
                  transition-colors
                "
              >
                Checkout
              </button>
            </div>
          </>
        )}

        {/* Receipt Footer */}
        <div className="text-center text-xs mt-6">
          <p>Thank you for shopping at ReLoveYarn!</p>
          <p>Please keep this receipt for your records.</p>
        </div>
      </div>

      {/* Popup (bigger, girly, with emojis) */}
      {showPopup && (
        <div
          className="
            fixed 
            top-1/2 
            left-1/2 
            transform 
            -translate-x-1/2 
            -translate-y-1/2 
            w-96 
            p-6 
            bg-gradient-to-br
            from-pink-100
            to-pink-400
            text-white 
            z-50 
            rounded-3xl 
            shadow-2xl 
            flex 
            flex-col 
            items-center 
            space-y-4 
            animate-bounceIn 
          "
        >
          {/* Bigger image container */}
          <div className="relative w-48 h-36">
            <Image
              src="/giphy.gif"
              alt="mean girls get in loser"
              layout="fill"
              objectFit="cover"
              unoptimized={true}
              className="border-4 border-white"
            />
          </div>

          <p className="text-lg font-bold text-center px-2">
            🛍️🛒 You’re ready to check out! 🛒🛍️
          </p>
          <p className="text-center text-sm px-2">
            Want to buy our goodies IRL? Visit{' '}
            <a
              href="https://www.vinted.se/member/187387484-reloveyarn"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-pink-200"
            >
              Vinted
            </a>{' '}
            or{' '}
            <a
              href="https://www.tradera.com/profile/feedback/4538851/reloveyarn?memberId=4538851&aliasSlug=reloveyarn"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-pink-200"
            >
              Tradera
            </a>
            !
          </p>

          <button
            onClick={closePopup}
            className="
              bg-white 
              text-pink-500 
              px-6 
              py-2 
              rounded-full 
              shadow-md 
              hover:bg-pink-50
              font-bold
              transition 
            "
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
