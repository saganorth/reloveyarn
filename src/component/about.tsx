import React, { useState } from 'react';
import Image from "next/image";

interface FlipState {
  mission: boolean;
  founder: boolean;
}

const AboutInfo: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState<FlipState>({ mission: false, founder: false });

  const handleFlip = (card: keyof FlipState) => {
    setIsFlipped(prev => ({ ...prev, [card]: !prev[card] }));
  };

  return (
    <main className="min-h-screen bg-[url('/img/scrapbook-bg.jpg')] bg-cover text-gray-800 flex flex-col items-center justify-center p-4 space-y-8">
      {/* Mission Section */}
      <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-2xl bg-white/80 backdrop-blur-sm m-4 relative">
        <div className="w-full h-full absolute transform transition-transform duration-700 ease-in-out" onClick={() => handleFlip('mission')}>
          <div className={`absolute inset-0 transition duration-700 ease-in-out ${isFlipped.mission ? 'rotate-y-180' : ''}`}>
            <div className="bg-white p-6 text-center">
              <div className="text-xs bg-white rounded-full px-3 py-1 font-semibold text-gray-700 absolute top-0 right-0 m-2">
                About Us
              </div>
              <h1 className="font-bold text-2xl mb-2" style={{ fontFamily: "'Caveat', cursive" }}>Our Mission</h1>
              <p className="text-gray-700 text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
                At ReLoveYarn, our commitment is to make slow fashion the first choice for consumers.
              </p>
              <p className="text-gray-700 text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
                We believe in sustainable and ethical practices that benefit both the planet and its people.
              </p>
              <p className="text-gray-700 text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
                By donating 10% of all proceeds to charity, we strive to contribute to positive change in our community and beyond.
              </p>
            </div>
          </div>
          <div className={`absolute inset-0 transition duration-700 ease-in-out ${isFlipped.mission ? 'rotate-y-0' : 'rotate-y-180'} rotate-y-180`}>
            <Image src="/img/filt.jpeg" alt="Our Mission" layout="fill" objectFit="cover" className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-2xl bg-white/80 backdrop-blur-sm m-4 relative">
        <div className="w-full h-full absolute transform transition-transform duration-700 ease-in-out" onClick={() => handleFlip('founder')}>
          <div className={`absolute inset-0 transition duration-700 ease-in-out ${isFlipped.founder ? 'rotate-y-180' : ''}`}>
            <div className="bg-white p-6 text-center">
              <h2 className="font-bold text-2xl mb-2" style={{ fontFamily: "'Caveat', cursive" }}>About the Founder</h2>
              <p className="text-gray-700 text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
                Jane Doe, the founder of ReLoveYarn, has been passionate about sustainable fashion for over a decade. With a background in textile design and a deep commitment to ethical practices, she started ReLoveYarn to make a difference in the fashion industry.
              </p>
            </div>
          </div>
          <div className={`absolute inset-0 transition duration-700 ease-in-out ${isFlipped.founder ? 'rotate-y-0' : 'rotate-y-180'} rotate-y-180`}>
            <Image src="/img/filt.jpeg" alt="About the Founder" layout="fill" objectFit="cover" className="w-full h-full" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutInfo;
