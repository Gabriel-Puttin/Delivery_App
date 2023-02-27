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
    models.SalesProduct.BelongsToMany(models.Product, {
      foreignKey: 'saleId',
      as: 'products',
      through: SalesProduct,
      otherKey: 'productId',
    });

    models.SalesProduct.BelongsToMany(models.Sale, {
      foreignKey: 'productId',
      as: 'products',
      through: SalesProduct,
      otherKey: 'saleId',
    });
  };

  return SalesProduct;
};