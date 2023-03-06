import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { requestData, requestUpdate } from '../services/requests';
import NavBar from '../components/NavBar';

const orderId = 'seller_order_details__element-order-details-label-order-id';
const dateId = 'seller_order_details__element-order-details-label-order-date';
const statusId = 'seller_order_details__element-order-details-label-delivery-status';
const preparingCheckId = 'seller_order_details__button-preparing-check';
const dispatchCheckId = 'seller_order_details__button-dispatch-check';

const itemNumberId = 'seller_order_details__element-order-table-item-number';
const nameId = 'seller_order_details__element-order-table-name';
const quantityId = 'seller_order_details__element-order-table-quantity';
const unitPriceId = 'seller_order_details__element-order-table-unit-price';
const subTotalId = 'seller_order_details__element-order-table-sub-total';
const totalId = 'seller_order_details__element-order-total-price';

function SellerOrdersDetails() {
  const [order, setOrder] = useState();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      const orderDetails = await requestData(`/sales/${id}`);
      setOrder(orderDetails);
      const formatedProducts = orderDetails.products.map((p) => {
        const { SalesProduct, ...product } = p;
        const { quantity } = SalesProduct;
        return { ...product, quantity };
      });
      setProducts(formatedProducts);
    };
    fetchOrders();
  }, [id]);

  useEffect(() => {
    const total = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total);
  }, [products]);

  const handleClick = async (status) => {
    await requestUpdate(`/sales/${id}`, { status });
    setOrder({ ...order, status });
  };

  return (
    <section>
      <NavBar />
      {order && (
        <div>
          <p
            data-testid={ orderId }
          >
            {order.id}
          </p>
          <p
            data-testid={ dateId }
          >
            {moment(order.saleDate).format('DD/MM/YYYY')}
          </p>
          <p
            data-testid={ `${statusId}${order.id}` }
          >
            {order.status}
          </p>
          <button
            type="button"
            data-testid={ preparingCheckId }
            disabled={ order.status !== 'Pendente' }
            onClick={ async () => handleClick('Preparando') }
          >
            PREPARAR PEDIDO
          </button>
          <button
            type="button"
            data-testid={ dispatchCheckId }
            disabled={ order.status !== 'Preparando' }
            onClick={ async () => handleClick('Em Trânsito') }
          >
            SAIU PARA ENTREGA
          </button>
        </div>

      )}
      <hr />
      <div>
        {
          products.map((product, index) => (
            <div key={ index }>
              <p
                data-testid={ `${itemNumberId}-${index}` }
              >
                {index + 1}
              </p>
              <p
                data-testid={ `${nameId}-${index}` }
              >
                {product.name}
              </p>
              <p
                data-testid={ `${quantityId}-${index}` }
              >
                {product.quantity}
              </p>
              <p
                data-testid={ `${unitPriceId}-${index}` }
              >
                {`${product.price.replace('.', ',')}`}
              </p>
              <p
                data-testid={ `${subTotalId}-${index}` }
              >
                {
                  (product.quantity * product.price)
                    .toFixed(2)
                    .toString()
                    .replace('.', ',')
                }
              </p>
            </div>
          ))
        }
        <p
          data-testid={ totalId }
        >
          {totalPrice.toFixed(2).toString().replace('.', ',')}
        </p>

      </div>
    </section>
  );
}

export default SellerOrdersDetails;
