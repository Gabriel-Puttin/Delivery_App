const { Sale, SalesProduct, Product } = require('../database/models');

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
  // const sales = await Sale.findByPk(id, {
  //   include: [{
  //     model: SalesProduct,
  //     required: true,
  //     as: 'sales',
  //     include: [{
  //       model: Product,
  //       required: true,
  //       as: 'products',
  //     }],
  //   }],
  // });
  const sales = await SalesProduct.findByPk(id, {
    include: [{ model: Sale, as: 'sales', attributes: { exclude: ['SalesProduct'] } },
    { model: Product, as: 'products', attributes: { exclude: ['SalesProduct'] } }]
  })
  return sales;
};

module.exports = {
  register,
  getAll,
  getById,
};
