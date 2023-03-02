const { Sale, SalesProduct } = require('../database/models');

const register = async (sale) => {
  const { orderInfo, products, user } = sale;

  const newSale = await Sale.create({ ...orderInfo, userId: user.id });
  newSale.id = newSale.null;

  await Promise.all(products.map(async ({ id: productId, quantity }) => {
    const saleProduct = { 
      saleId: newSale.id, 
      productId,
      quantity,
    };
    await SalesProduct.create(saleProduct);
  }));

  return newSale;
};

const getAll = async (userId) => {
  const sales = await Sale.findAll({ where: { userId } });
  return sales;
};

module.exports = {
  register,
  getAll,
};
