import React from 'react';

import Header from '../../component/ui/Header';
import Footer from '../../component/ui/Footer';
import ProductsPage from './Product';

const ShopPage = () => {
  return (
    <div>
        <Header/>

      <ProductsPage/>
      <Footer/>
    </div>
  );
};

export default ShopPage;
