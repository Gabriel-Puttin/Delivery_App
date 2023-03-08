const userInfo = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const wrongUser = {
  email: 'email@email.com',
  password: '12345678',
};

const client = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer'
};

const allClients = [
  {
    "id": 2,
    "name": "Fulana Pereira",
    "email": "fulana@deliveryapp.com",
    "role": "seller"
  },
  {
    "id": 3,
    "name": "Cliente Zé Birita",
    "email": "zebirita@email.com",
    "role": "customer"
  }
];

const allSellers = [
  {
    "id": 2,
    "name": "Fulana Pereira"
  }
];

const newClient = {
  "name": "Novo Cliente",
  "email": "novocliente@email.com",
  "password": "novocliente123"
};

const newClientAdmin = {
  name: "Novo Cliente",
  email: "novocliente@email.com",
  password: "novocliente123",
  role: 'seller'
};

const registerResponse = {
  "name": "Novo Cliente",
  "email": "novocliente@email.com",
  "role": "customer",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTm92byBDbGllbnRlIiwiZW1haWwiOiJub3ZvY2xpZW50ZUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpZCI6NCwiaWF0IjoxNjc4MzAwOTkyLCJleHAiOjE2Nzg5MDU3OTJ9.FFu2UJr4CdpG0iACPtimAbpgCV1QyYE7hNgxSsOwI4A"
};

module.exports = {
  userInfo,
  client,
  wrongUser,
  allClients,
  allSellers,
  newClient,
  newClientAdmin,
  registerResponse,
};
