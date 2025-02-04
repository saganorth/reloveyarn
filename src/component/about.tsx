// pages/about.tsx
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <main
      className="
        min-h-screen 
        bg-violet-100 
        p-8 
        flex 
        justify-center 
        items-center
      "
    >
      {/* “Bok”-container */}
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
        "
        style={{
          // Bakgrundsbild: linjerat papper
          backgroundImage: "url('/note.jpg')",
          backgroundRepeat: 'repeat-y',
          backgroundSize: '100% auto',
        }}
      >
        {/* Spiral-dekor högst upp (valfritt) */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] h-6 flex items-center justify-evenly">
          {/* ex. små cirklar / ringar som ser ut som spiralhål */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="
                w-4 h-4 
                bg-gray-200 
                rounded-full 
                border-2 border-gray-400
              "
            />
          ))}
        </div>

        {/* Själva innehållet */}
        <div className="pt-10 pb-8 px-6" style={{ fontFamily: "'Caveat', cursive" }}>
          <h1
            className="
              text-5xl 
              text-center 
              mb-4 
              font-bold 
              text-gray-800
            "
          >
            Dear Diary
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Today, I want to share the story of ReLoveYarn. It's a place where creativity
            meets sustainability. Click on a corner to learn more about our journey!
          </p>

          <p className="text-xl text-gray-700 leading-relaxed">
            Our mission is all about slowing down the fashion industry, one stitch at a time.
            We believe in giving yarn a second chance, and donating a portion of proceeds
            to charity along the way.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
