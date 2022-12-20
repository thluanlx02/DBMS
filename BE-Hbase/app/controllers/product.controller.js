const client = require("../models");

// // Create and Save a new Product
exports.create = (req, res) => {
  //     // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //     // Create a Product
  const product = {
    name: req.body.name,
    price: req.body.price,
    supplierId: req.body.supplierId,
  };
  let listIndex = [];
  client.table("product").scan(
    {
      startRow: "0",
      maxVersions: 1,
    },
    (err, rows) => {
      // console.log(rows)
      rows.forEach((row) => {
        if (listIndex.indexOf(parseInt(row.key)) == -1) {
          listIndex.push(parseInt(row.key));
        }
      });
      const cells = [
        {
          column: "personal data:name",
          timestamp: Date.now(),
          $: product.name,
        },
        {
          column: "personal data:price",
          timestamp: Date.now(),
          $: product.price,
        },
        {
          column: "personal data:supplierId",
          timestamp: Date.now(),
          $: product.supplierId.toString(),
        },
      ];
      client
        .table("product")
        .row(parseInt(listIndex[listIndex.length - 1]) + 1)
        .put(cells, (error, success) => {
          if (!success) {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the product.",
            });
          } else {
            res.send({
              id: parseInt(listIndex[listIndex.length - 1]) + 1,
              ...product,
            });
          }
        });
    }
  );
};

// // Retrieve all Products from the database.
exports.findAll = (req, res) => {
  // const name = req.query.name;
  // // var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  let data = [];
  let listIndex = [];
  client.table("product").scan(
    {
      startRow: "0",
      maxVersions: 1,
    },
    (err, rows) => {
      rows.forEach((row) => {
        if (listIndex.indexOf(parseInt(row.key)) == -1) {
          listIndex.push(parseInt(row.key));
        }
      });
      rows.forEach((row) => {
        if (!data[listIndex.indexOf(parseInt(row.key))]) {
          data.push({ id: parseInt(row.key) });
        }
        if (row.column == "personal data:name") {
          data[listIndex.indexOf(parseInt(row.key))].name = row["$"];
        }
        if (row.column == "personal data:price") {
          data[listIndex.indexOf(parseInt(row.key))].price = row["$"];
        }
      });
      res.send(data);
    }
  );
};

// // Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    client
      .table("product")
      .row(id)
      .delete((error, success) => {
        if (success) {
          res.send({
            message: "product was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete product with id=${id}. Maybe product was not found!`,
          });
        }
      });
}
