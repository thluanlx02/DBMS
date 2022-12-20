module.exports = app => {
    const orders = require("../controllers/order.controller.js");
    var router = require("express").Router();
    // Create a new Order
    router.post("/orders", orders.create);
    // Retrieve all Orders
    router.get("/orders", orders.findAll);
    // Delete an Order with the specified id in the request
    router.delete("/orders/:id", orders.delete);
    // Delete all Orders
    router.delete("/orders", orders.deleteAll);

    router.get("/orders/findAllNumberProductBySupplier", orders.findAllNumberProductBySupplier);

    app.use("/api", router);
};