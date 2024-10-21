// Detail.js
import React from 'react';
import ProductDetail from '../../component/ProduktDetail';

// Assuming this function is exported from a service module
import { getProductById } from '../../services/productService';

const Detail = ({ productId }) => {
    const [product, setProduct] = React.useState(null);

    React.useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductById(productId);
            setProduct(data);
        };

        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Product Detail</h1>
            <ProductDetail product={product} />
        </div>
    );
};

export default Detail;
