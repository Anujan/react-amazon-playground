import React from 'react';
import { Route } from 'react-router';

// Containers
import MainContainer from 'components/containers/main';

// Pages
import ProductsGrid from 'components/pages/products_grid.jsx';
import ProductModal from 'components/pages/product_modal.jsx';

export default (
  <Route handler={MainContainer}>
    <Route name='products' path='/' handler={ProductsGrid}>
      <Route name='product' path='product/:id' handler={ProductModal} />
    </Route>
  </Route>
);
