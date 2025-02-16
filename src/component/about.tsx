import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <main className="flex items-center justify-center min-h-screen text-gray-800" style={{ background: 'url(/shopping.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* “Book”-style container */}
      <div
        className="
          w-full 
          max-w-2xl 
          bg-white 
          relative 
          shadow-2xl 
          rounded-2xl 
          border-4 
          border-gray-300
          overflow-hidden
          flex flex-col items-center
        "
        style={{
          backgroundImage: "url('/note.jpg')",
          backgroundRepeat: 'repeat-y',
          backgroundSize: '100% auto',
        }}
      >
        {/* Spiral-decor at the top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] h-6 flex items-center justify-evenly">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-gray-200 rounded-full border-2 border-gray-400"
            />
          ))}
        </div>

        {/* Content */}
        <div className="pt-10 pb-8 px-6 text-center" style={{ fontFamily: "'Caveat', cursive" }}>
          <h1 className="text-5xl mb-4 font-bold text-gray-800">Dear Custumer</h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Today, I want to share the story of ReLoveYarn. It's a place where creativity
            meets sustainability. All our items are made with love and reowned yarn. We use scraps and  
          </p>
          <h2 className="text-5xl mb-4 font-bold text-gray-800">Charity</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Our mission is all about slowing down the fashion industry, one stitch at a time.
            We believe in giving yarn a second chance, and donating 10% of proceeds
            to charity along the way.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
