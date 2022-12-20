const client = require("../models");

// // Create and Save a new Customer
exports.create = (req, res) => {
//     // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

//     // Create a Customer
    const customer = {
        name: req.body.name,
        gender: req.body.gender,
        phone: req.body.phone
    };

    let listIndex = [];
    client.table("customer").scan(
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
            $: customer.name,
          },
          {
            column: "personal data:gender",
            timestamp: Date.now(),
            $: customer.gender,
          },
          {
            column: "personal data:phone",
            timestamp: Date.now(),
            $: customer.phone,
          },
        ];
        client
          .table("customer")
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
                ...customer,
              });
            }
          });
      }
    );
};

// // Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  let data = [];
  let listIndex = [];
  client.table("customer").scan(
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
        if (row.column == "personal data:gender") {
          data[listIndex.indexOf(parseInt(row.key))].gender = row["$"];
        }
        if (row.column == "personal data:phone") {
            data[listIndex.indexOf(parseInt(row.key))].phone = row["$"];
          }
      });
    //   console.log(data)
      res.send(data);
    }
  );
};

// // Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    client
      .table("customer")
      .row(id)
      .delete((error, success) => {
        if (success) {
          res.send({
            message: "customer was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete customer with id=${id}. Maybe customer was not found!`,
          });
        }
      });
}
