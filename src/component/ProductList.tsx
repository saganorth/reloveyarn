import Link from 'next/link';
import Image from 'next/image';

const ProductList = ({ products }) => {
  const assetBaseUrl = "http://localhost:3000/"; // Ensure this is correct and consistent

  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => {
        // Correctly format the image URL to prevent double slashes and ensure it's used consistently
        const imageUrl = `${assetBaseUrl}${product.imageUrl.startsWith('/') ? product.imageUrl.slice(1) : product.imageUrl}`;
        return (
          <div key={product.id} className="m-4 w-64 rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
            <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg relative">
              <Link href={`/products/${product.category}/${product.id}`}>
                <div aria-label={`View details for ${product.namn}`} className="block hover:bg-gray-200">
                  <Image
                    src={imageUrl} // Use the 'imageUrl' variable here to ensure consistency
                    alt={product.namn}
                    width={500}
                    height={300}
                    className="w-full mb-4"
                    style={{ flexGrow: 1 }}
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "'Caveat', cursive" }}>
                      {product.namn}
                    </h3>
                    <p className="text-gray-600">${product.pris}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
