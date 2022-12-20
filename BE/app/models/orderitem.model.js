module.exports = (sequelize, Sequelize) => { 
    const OrderItem = sequelize.define("orderitem", {
        quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
    },
 
    {indexes: [
        {
            unique: true,
            fields: ['order_id', 'product_id']
        },
        {
            unique: false,
            fields : ['created_at'],
            using: 'BRIN'
        }
    ]}
    );
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