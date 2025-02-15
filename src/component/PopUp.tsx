import React from 'react';
import Image from 'next/image';


interface PopupProps {
  show: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed top-16 right-4 bg-pink-500 text-white px-4 py-2 rounded shadow-md z-50 transition-transform duration-300 flex flex-col items-center space-y-2">
      <Image
        unoptimized={true}
        src="/dancing.gif"
        alt="Celebration GIF"
        height={200}
        width={200}
      />
    
      <div className="flex items-center space-x-2">
        <span role="img" aria-label="sparkles">✨</span>
        <p>Yas girl! Item added to cart!</p>
        <span role="img" aria-label="sparkles">✨</span>
      </div>
    </div>
  );
};

export default Popup;
