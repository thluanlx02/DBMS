module.exports = (sequelize, Sequelize) => { 
    const OrderItem = sequelize.define("orderitem", {
        quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        },
        price: {
        type: Sequelize.BIGINT,
        allowNull: false,
        },
    });
    OrderItem.belongsTo(
        sequelize.models.order,
        {
            as: 'order',
            foreignKey: 'order_id'
        }
    )
    OrderItem.belongsTo(
        sequelize.models.product,
        {
            as: 'product',
            foreignKey: 'product_id'
        }
    )
    return OrderItem;
}