module.exports = app => {
    const products = require("../controllers/product.controller.js");
    var router = require("express").Router();
    // Create a new Product
    router.post("/products", products.create);
    // Retrieve all Products
    router.get("/products", products.findAll);
    // Retrieve all published Products
    // router.get("/products/published", products.findAllPublished);
    // // Retrieve a single Product with id

    // router.get("/products/:id", products.findOne);
    // // Update a Product with id
    // router.put("/products/:id", products.update);
    // // Delete a Product with id
    router.delete("/products/:id", products.delete);
    // // Create a new Product
    // router.delete("/products", products.deleteAll);
    app.use("/api", router);
    
}