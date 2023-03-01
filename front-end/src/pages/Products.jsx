import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { requestData } from '../services/requests';

const ONE = -1;

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await requestData('/products');
      const newCart = allProducts.map(({ name, id, price }) => ({
        name,
        id,
        price,
        quantity: 0,
      }));
      setCart(newCart);
      setProducts(allProducts);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(cart));
    const total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total);
  }, [cart]);

  const handleClick = (id, amount) => {
    setCart(cart.map((item) => {
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
    const numberCart = Number(value) < 0 ? 0 : Number(value);
    setCart(cart.map((item) => {
      if (item.id === Number(id)) {
        return { ...item, quantity: numberCart };
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
        <section key={ product.id }>
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
            onClick={ () => handleClick(product.id, ONE) }
          >
            -
          </button>
          <input
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
            id={ product.id }
            type="number"
            value={ cart[index].quantity }
            onChange={ handleChange }
            min="0"
          />
          <button
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
            type="button"
            onClick={ () => handleClick(product.id, 1) }
          >
            +
          </button>
        </section>))}
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
