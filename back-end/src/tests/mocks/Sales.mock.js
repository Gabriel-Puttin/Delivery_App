const sales = [
  {
    "id": 1,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "45.52",
    "deliveryAddress": "sdfsdfsf",
    "deliveryNumber": "132",
    "saleDate": "2023-03-06T18:05:45.000Z",
    "status": "Em Trânsito"
  },
  {
    "id": 2,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": "21.88",
    "deliveryAddress": "Rua: KAKAKA",
    "deliveryNumber": "333",
    "saleDate": "2023-03-07T18:02:26.000Z",
    "status": "Pendente"
  }
];

const salesById = {
  "id": 2,
  "totalPrice": "21.88",
  "deliveryAddress": "Rua: KAKAKA",
  "deliveryNumber": "333",
  "saleDate": "2023-03-07T18:02:26.000Z",
  "status": "Pendente",
  "seller": {
    "name": "Fulana Pereira"
  },
  "products": [
    {
      "id": 1,
      "name": "Skol Lata 250ml",
      "price": "2.20",
      "url_image": "http://localhost:3001/images/skol_lata_350ml.jpg",
      "SalesProduct": {
        "quantity": 1
      }
    },
    {
      "id": 2,
      "name": "Heineken 600ml",
      "price": "7.50",
      "url_image": "http://localhost:3001/images/heineken_600ml.jpg",
      "SalesProduct": {
        "quantity": 1
      }
    },
    {
      "id": 3,
      "name": "Antarctica Pilsen 300ml",
      "price": "2.49",
      "url_image": "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
      "SalesProduct": {
        "quantity": 1
      }
    },
    {
      "id": 4,
      "name": "Brahma 600ml",
      "price": "7.50",
      "url_image": "http://localhost:3001/images/brahma_600ml.jpg",
      "SalesProduct": {
        "quantity": 1
      }
    },
    {
      "id": 5,
      "name": "Skol 269ml",
      "price": "2.19",
      "url_image": "http://localhost:3001/images/skol_269ml.jpg",
      "SalesProduct": {
        "quantity": 1
      }
    }
  ]
};

const postSaleBody = {
  "orderInfo": {
    "deliveryAddress": "sdfsdfsf",
    "deliveryNumber": "132",
    "sellerId": 2,
    "totalPrice": 45.52
  },
  "products": [
    {
      "name": "Antarctica Pilsen 300ml",
      "id": 3,
      "price": "2.49",
      "quantity": 4
    },
    {
      "name": "Becks 600ml",
      "id": 9,
      "price": "8.89",
      "quantity": 5
    }],
  "user": {
    "name": 'Fulana Pereira',
    "email": 'fulana@deliveryapp.com',
    "role": 'seller',
  },
};

module.exports = {
  sales,
  salesById,
  postSaleBody,
};
