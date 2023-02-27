const express = require('express');
const { loginRoute } = require('../Routes/Login.Route');
const { errorMiddleware } = require('../middlewares/errorMiddleware');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoute);
app.use(errorMiddleware);

module.exports = app;
