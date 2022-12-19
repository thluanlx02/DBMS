module.exports = app => {
    const suppliers = require("../controllers/supplier.controller.js");
    var router = require("express").Router();
    // Create a new Supplier
    router.post("/suppliers", suppliers.create);
    // Retrieve all Suppliers
    router.get("/suppliers", suppliers.findAll);
    // Retrieve all published Suppliers
    // router.get("/suppliers/published", suppliers.findAllPublished);
    // // Retrieve a single Supplier with id
    // router.get("/suppliers/:id", suppliers.findOne);
    // // Update a Supplier with id
    // router.put("/suppliers/:id", suppliers.update);
    // // Delete a Supplier with id
    router.delete("/suppliers/:id", suppliers.delete);
    // // Create a new Supplier
    // router.delete("/suppliers", suppliers.deleteAll);
    app.use("/api", router);
}