const client = require("../models");
// // Create and Save a new Supplier
exports.create = (req, res) => {
  //     // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //     // Create a Supplier
  const supplier = {
    name: req.body.name,
    city: req.body.city,
  };
  let listIndex = [];
  client.table("supplier").scan(
    {
      startRow: "0",
      maxVersions: 1,
    },
    (err, rows) => {
      // console.log(rows)
      rows.forEach((row) => {
        if(listIndex.indexOf(parseInt(row.key)) == -1){
          listIndex.push(parseInt(row.key))
        }
      })
      const cells = [
        {
          column: "personal data:name",
          timestamp: Date.now(),
          $: supplier.name,
        },
        {
          column: "personal data:city",
          timestamp: Date.now(),
          $: supplier.city,
        },
      ];
      client
        .table("supplier")
        .row(parseInt(listIndex[listIndex.length-1])+1)
        .put(cells, (error, success) => {
          if (!success) {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the Supplier.",
            });
          }
          else {
            res.send({id : parseInt(listIndex[listIndex.length-1])+1,...supplier});
          }
        });
    }
  );
};

// // Retrieve all Suppliers from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  // var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  let data = [];
  let listIndex = [];
  client.table("supplier").scan(
    {
      startRow: "0",
      maxVersions: 1,
    },
    (err, rows) => {
      rows.forEach((row) => {
        if(listIndex.indexOf(parseInt(row.key)) == -1){
          listIndex.push(parseInt(row.key))
        }
      })
      rows.forEach((row) => {
        if (!data[listIndex.indexOf(parseInt(row.key))]) {
          data.push({ id: parseInt(row.key) });
        }
        if (row.column == "personal data:name") {
          data[listIndex.indexOf(parseInt(row.key))].name = row["$"];
        }
        if (row.column == "personal data:city") {
          data[listIndex.indexOf(parseInt(row.key))].city = row["$"];
        }
      });
      res.send(data);
    }
  );
};

// // Delete a Supplier with the specified id in the request

exports.delete = (req, res) => {
  const id = req.params.id;
  client
    .table("supplier")
    .row(id.toString())
    .delete((error, success) => {
      if (success) {
        res.send({
          message: "Supplier was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Supplier with id=${id}. Maybe Supplier was not found!`,
        });
      }
    });
};
