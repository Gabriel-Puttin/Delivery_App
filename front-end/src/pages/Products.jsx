import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { requestData } from '../services/requests';

const REMOVE_AMOUNT = -1;
const ADD_AMOUNT = 1;

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await requestData('/products');
      if (!mountedRef.current) return;
      setProducts(productsData.map((product) => ({
        ...product,
        quantity: 0,
      })));
    };
    fetchProducts();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(products));
    const total = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total);
  }, [products]);

  const handleClick = (id, amount) => {
    setProducts((p) => p.map((item) => {
      const value = item.quantity + amount;
      if (item.id === id) {
        return { ...item, quantity: value < 0 ? 0 : value };
      }
      return item;
    }));
  };

  const handleChange = (event) => {
    const { target } = event;
    const { id, value } = target;
    setProducts((p) => p.map((item) => {
      if (item.id === Number(id)) {
        return {
          ...item,
          quantity: Number(value) < 0 ? 0 : Number(value),
        };
      }
      return item;
    }));
  };

  const changeRouteClick = () => {
    navigate('/customer/checkout');
  };

  return (
    <section>
      <NavBar />
      {products.map((product, index) => (
        <div key={ `product-${product.id}` }>
          <h4
            data-testid={ `customer_products__element-card-price-${product.id}` }
          >
            {product.price.replace('.', ',')}
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
            onClick={ () => handleClick(product.id, REMOVE_AMOUNT) }
          >
            -
          </button>
          <input
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
            id={ product.id }
            type="number"
            value={ products[index].quantity }
            onChange={ handleChange }
            min="0"
          />
          <button
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
            type="button"
            onClick={ () => handleClick(product.id, ADD_AMOUNT) }
          >
            +
          </button>
        </div>
      ))}
      <button
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ changeRouteClick }
        disabled={ totalPrice === 0 }
      >
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { totalPrice.toFixed(2).toString().replace('.', ',') }
        </span>
      </button>
    </section>
  );
}

export default Products;
