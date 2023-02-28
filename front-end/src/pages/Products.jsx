import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { requestData } from '../services/requests';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await requestData('/products');
      setProducts(allProducts);
    };
    fetchProducts();
  }, []);

  return (
    <section>
      <NavBar />
      {products.map((product) => (
        <section key={ product.id }>
          <h4
            data-testid={ `customer_products__element-card-price-${product.id}` }
          >
            {product.price}
          </h4>
          <img
            data-testid={ `customer_products__img-card-bg-image-${product.id}` }
            src={ product.url_image }
            alt={ product.name }
          />
          <h3
            data-testid={ `customer_products__element-card-title-${product.id}` }
          >
            {product.name}
          </h3>
          <button
            data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            type="button"
          >
            -
          </button>
          <input
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
            type="text"
          />
          <button
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
            type="button"
          >
            +
          </button>
        </section>))}
    </section>
  );
}

export default Products;
