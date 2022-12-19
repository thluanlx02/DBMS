module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
  });
  Product.belongsTo(
    sequelize.models.supplier,
    {
      as: 'supply',
      foreignKey: 'supplier_id'
    }
  )

  return Product;
};
