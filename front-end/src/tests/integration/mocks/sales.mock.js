export const getSalesResponse = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '45.52',
    deliveryAddress: 'Rua da Lua',
    deliveryNumber: '132',
    saleDate: '2023-02-03T12:07:47.000Z',
    status: 'Pendente',
  },
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    totalPrice: '45.52',
    deliveryAddress: 'Rua de Marte',
    deliveryNumber: '132',
    saleDate: '2023-03-03T12:07:47.000Z',
    status: 'Em Trânsito',
  },
  {
    id: 3,
    userId: 3,
    sellerId: 2,
    totalPrice: '45.52',
    deliveryAddress: 'Rua da Serra',
    deliveryNumber: '132',
    saleDate: '2023-03-03T12:07:48.000Z',
    status: 'Entregue',
  },

];

export const getOrderDetailsResponse = {
  id: 1,
  totalPrice: '45.52',
  deliveryAddress: 'Rua Serra da Goiaba',
  deliveryNumber: '132',
  saleDate: '2023-03-03T12:07:47.000Z',
  status: 'Pendente',
  seller: {
    name: 'Fulana Pereira',
  },
  products: [
    {
      id: 3,
      name: 'Antarctica Pilsen 300ml',
      price: '2.49',
      url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
      SalesProduct: {
        quantity: 4,
      },
    },
    {
      id: 9,
      name: 'Becks 600ml',
      price: '8.89',
      url_image: 'http://localhost:3001/images/becks_600ml.jpg',
      SalesProduct: {
        quantity: 4,
      },
    },
  ],
};

export default getSalesResponse;
