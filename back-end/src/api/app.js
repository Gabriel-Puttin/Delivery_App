const express = require('express');
const { loginRoute } = require('../Routes/Login.Route');
const { errorMiddleware } = require('../middlewares/errorMiddleware');

const app = express();
app.use(express.json());

app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoute);
app.use(errorMiddleware);

module.exports = app;
