const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if (!req.body.total) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Order
    const order = {
        total: req.body.total,
        customer_id: req.body.customer_id,
        product_id: req.body.product_id
    };

    // Save Order in the database
    Order.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Order."
            });
        });
}

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
    const total = req.query.total;
    var condition = total ? { total: { [Op.iLike]: `%${total}%` } } : null;

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
