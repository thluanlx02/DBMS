module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        name: {
        type: Sequelize.STRING,
        },
        gender: {
        type: Sequelize.STRING
        },
        phone:{
        type: Sequelize.STRING
        }
    });
    Customer.hasMany(
        sequelize.models.order,
       {
            as: 'orders',
            foreignKey: 'customer_id'
       }
    )
    return Customer;
};