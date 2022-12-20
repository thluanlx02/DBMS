module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      total: {
        type: Sequelize.BIGINT
      },

    });

    return Order;
  };
  