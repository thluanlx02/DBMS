module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
    var router = require("express").Router();
//     // Create a new Customer
    router.post("/customers", customers.create);
//     // Retrieve all Customers
    router.get("/customers", customers.findAll);
//     // Delete a Customer with the specified id in the request
    router.delete("/customers/:id", customers.delete);

    

    app.use("/api", router);
};
