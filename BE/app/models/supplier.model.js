module.exports = (sequelize, Sequelize) => {
    const Supplier = sequelize.define("supplier", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      city: {
        type: Sequelize.STRING
      }
    });

    return Supplier;
  };
  