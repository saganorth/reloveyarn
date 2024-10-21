import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <main className="min-h-screen bg-violet-200 text-gray-800 p-8">
      {/* Mission Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: "'Caveat', cursive" }}>Our Mission</h1>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <Image src="/scrapbook.png" alt="Our Mission" width={500} height={300} className="rounded-lg" />
          </div>
          <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
            <p className="text-lg mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
              At ReLoveYarn, our commitment is to make slow fashion the first choice for consumers.
            </p>
            <p className="text-lg mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
              We believe in sustainable and ethical practices that benefit both the planet and its people.
            </p>
            <p className="text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
              By donating 10% of all proceeds to charity, we strive to contribute to positive change in our community and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: "'Caveat', cursive" }}>About the Founder</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <Image src="/filt.jpeg" alt="About the Founder" width={500} height={300} className="rounded-lg" />
          </div>
          <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
            <p className="text-lg mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
              Saga Nord, the founder of ReLoveYarn, has been passionate about sustainable fashion for over a decade.
            </p>
            <p className="text-lg mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
              With a background in textile design and a deep commitment to ethical practices, she started ReLoveYarn to make a difference in the fashion industry.
            </p>
            <p className="text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
              Saga's vision is to create a world where fashion is both beautiful and sustainable, and she works tirelessly to make this vision a reality.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;