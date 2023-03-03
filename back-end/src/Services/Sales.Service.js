const { Sale, SalesProduct, Product, User } = require('../database/models');

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

const getById = async (id) => {
  const sales = await Sale.findByPk(id, {
    // include: { all: true },
    include: [
      { model: User, as: 'seller', attributes: ['name'] },
      { model: Product, as: 'products', through: { attributes: ['quantity'] } },
    ], 
    attributes: { exclude: ['userId', 'sellerId'] },
  });

  return sales;
};

module.exports = {
  register,
  getAll,
  getById,
};
