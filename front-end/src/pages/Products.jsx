/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavBar from '../components/NavBar';
import { requestData } from '../services/requests';

const REMOVE_AMOUNT = -1;
const ADD_AMOUNT = 1;

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await requestData('/products');
      setProducts(productsData.map((product) => ({
        ...product,
        quantity: 0,
      })));
    };
    fetchProducts();
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
          quantity: Number(value),
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
      <div id="body_cards">

        {products.map((product, index) => (
          <Card
            // style={ { width: 'rem' } }
            className="cards_products"
            key={ `product-${product.id}` }
          >
            <Card.Body>
              <Card.Title
                className="price_title"
                data-testid={ `customer_products__element-card-price-${product.id}` }
              >
                {`R$ ${product.price.replace('.', ',')}`}
              </Card.Title>
              <Card.Img
                className="image_product"
                variant="top"
                data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                src={ product.url_image }
                alt={ product.name }
              />
              <Card.Footer
                className="card_footer"
              >
                <Card.Title
                  className="title_card"
                  data-testid={ `customer_products__element-card-title-${product.id}` }
                >
                  {product.name}
                </Card.Title>
                <div className="footer_container_products">
                  <Button
                    bsPrefix
                    id="button_decrescent"
                    className="button_sum"
                    data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                    type="button"
                    onClick={ () => handleClick(product.id, REMOVE_AMOUNT) }
                  >
                    -
                  </Button>
                  <input
                    className="input_value_button"
                    data-testid={ `customer_products__input-card-quantity-${product.id}` }
                    id={ product.id }
                    value={ products[index].quantity }
                    onChange={ handleChange }
                    min="0"
                  />
                  <Button
                    bsPrefix
                    className="button_sum"
                    data-testid={
                      `customer_products__button-card-add-item-${product.id}`
                    }
                    type="button"
                    onClick={ () => handleClick(product.id, ADD_AMOUNT) }
                  >
                    +
                  </Button>
                </div>
              </Card.Footer>
            </Card.Body>
          </Card>
        ))}
      </div>

      <button
        id="checkout"
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ changeRouteClick }
        disabled={ totalPrice === 0 }
      >
        <span>Ver Carrinho: </span>
        <span
          id="span_checkout"
          data-testid="customer_products__checkout-bottom-value"
        >
          { ` R$ ${totalPrice.toFixed(2).toString().replace('.', ',')}` }
        </span>
      </button>
    </section>
  );
}

export default Products;
