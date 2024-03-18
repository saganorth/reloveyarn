import React from 'react';

const aboutPage = () => {
  return (
    <main className="bg-violet-200 text-white">
      {/* Stor Bildsektion */}
      <div className="h-screen  bg-cover bg-center" style={{ backgroundImage: "url('filt.jpeg')" }}>
        <div className="flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white">om oss</h1>
        </div>
      </div>


      {/* Artiklar Sektion */}
      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-semibold mb-5">Senaste Artiklarna</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Artikelkort */}
          {/* Upprepa dessa kort för varje artikel */}
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-700">
            <img className="w-full" src="artikelbild-url.jpg" alt="Artikelbild" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Artikelns Titel</div>
              <p className="text-gray-300 text-base">
                Kort artikelbeskrivning här.
              </p>
            </div>
          </div>
          {/* Artikelkort slut */}
        </div>
      </div>
    </main>
  );
};

export default aboutPage;
