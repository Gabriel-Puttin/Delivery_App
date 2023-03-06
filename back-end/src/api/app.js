const express = require('express');
const { loginRoute } = require('../Routes/Login.Route');
const errorMiddleware = require('../middlewares/errorMiddleware');
const { registerRoute } = require('../Routes/Register.Route');
const productsRoute = require('../Routes/Products.Route');
const { userRoute } = require('../Routes/User.Route');
const { salesRoute } = require('../Routes/Sales.Route');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/users', userRoute);
app.use('/products', productsRoute);
app.use('/sales', salesRoute);
app.use(errorMiddleware);

module.exports = app;
