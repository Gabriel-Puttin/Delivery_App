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

const getAll = async (user) => {
  if (user.role === 'customer') return Sale.findAll({ where: { userId: user.id } });
  if (user.role === 'seller') return Sale.findAll({ where: { sellerId: user.id } });
};

const getById = async (id) => {
  const order = await Sale.findByPk(id, {
    include: [
      { model: User, as: 'seller', attributes: ['name'] },
      { model: Product, as: 'products', through: { attributes: ['quantity'] } },
    ], 
    attributes: { exclude: ['userId', 'sellerId'] },
  });

  return order;
};

const update = async (id, body) => {
  const { status } = body;
  return Sale.update({ status }, { where: { id } });
};

module.exports = {
  register,
  getAll,
  getById,
  update,
};
