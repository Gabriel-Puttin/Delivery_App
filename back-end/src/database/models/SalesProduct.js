module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
    {
      timestamps: false,
      tableName: 'sales_products',
      underscored: true,
    });

  SalesProduct.associate = (models) => {
    models.SalesProduct.belongsToMany(models.Product, {
      foreignKey: 'saleId',
      as: 'products',
      through: SalesProduct,
      otherKey: 'productId',
    });

    models.SalesProduct.belongsToMany(models.Sale, {
      foreignKey: 'productId',
      as: 'sales',
      through: SalesProduct,
      otherKey: 'saleId',
    });
  };

  return SalesProduct;
};