const db = require("../models");
const Supplier = db.suppliers;
const Op = db.Sequelize.Op;

// Create and Save a new Supplier
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Supplier
    const supplier = {
        name: req.body.name,
        city: req.body.city,
    };

    // Save Supplier in the database
    Supplier.create(supplier)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Supplier."
            });
        });
}

// Retrieve all Suppliers from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Supplier.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving suppliers."
            });
        });
}

// Delete a Supplier with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;

    Supplier.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Supplier was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Supplier with id=${id}. Maybe Supplier was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Supplier with id=" + id
            });
        });
}

//Get supplier by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Supplier.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Supplier with id=" + id
            });
        });
}
