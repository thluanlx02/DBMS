const db = require("../models");
const Order = db.orders;
const OrderItem = db.orderitems;
const Product = db.products;
const Customer = db.customers;
const Supplier = db.suppliers;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = async (req, res) => {

    // Save Order in the database
    let total = 0
    let orderId
    const result = await Order.create(
        {
            total: total,
        }
    )

    if (result) {
        orderId = result.id
    }

    console.log("___________", req.body.orderItems);
    // Save OrderItems in the database
    for (let i = 0; i < req.body.orderItems.length; i++) {
        console.log("___________", req.body.orderItems[i].quantity);
        let price = 0
        const item = await Product.findOne({
            where: {
                id: req.body.orderItems[i].productId
            },

        })

        if (item) {
            price = item.price
        }

        total += req.body.orderItems[i].quantity * price
        console.log("___________", total, price, req.body.orderItems[i].quantity * price);
        OrderItem.create({
            order_id: orderId,
            product_id: req.body.orderItems[i].productId,
            quantity: req.body.orderItems[i].quantity,
        })
            .catch(err => {
                console.log("___________", err);
            });
    }

    // // Update Order total
    Order.update
        (
            { total: total },
            {
                where: { id: orderId }
            }
        )

    res.send({ message: "Order was created successfully!" });


}

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
    const total = req.query.total;
    var condition = total ? { total: { [Op.like]: `%${total}%` } } : null;

    Order.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        });
}

// Find a single Order with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Order with id=" + id
            });
        });
}

// Update a Order by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Order.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });
}

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Order.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id
            });
        });
}


// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
    Order.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Orders were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all orders."
            });
        });
}

// Total order by product
exports.findAllNumberProductBySupplier = (req, res) => {


    const startTime = req.query.startTime;
    const endTime = req.query.endTime;


    console.log("___________", startTime, endTime);

    OrderItem.findAll({
        where: {
            created_at: {
                [Op.between]: [startTime, endTime]
            }
        },
        attributes: ['product_id', [db.sequelize.fn('sum', db.sequelize.col('quantity')), 'total']],
        group: ['product_id'],
        // include: [
        //     {
        //         model: Product,
        //         attributes: ['name'],
        //         as: 'product',
        //     }
        // ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        });
}