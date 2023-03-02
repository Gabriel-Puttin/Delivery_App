module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: DataTypes.DECIMAL(10,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    });

  Sale.associate = (models) => {
    models.Sale.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'user',
    });

    models.Sale.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'seller'
    });

    models.Sale.hasMany(models.SalesProduct,
      { foreignKey: 'saleId', as: 'sales' });
  };

  return Sale;
};