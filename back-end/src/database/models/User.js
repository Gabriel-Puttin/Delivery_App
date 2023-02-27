module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true,
    });

  User.associate = (models) => {
    models.User.hasMany(models.Sale,
      { foreignKey: 'userId', as: 'orders' });

    models.User.hasMany(models.Sale,
      { foreignKey: 'sellerId', as: 'sales' });
  };

  return User;
};