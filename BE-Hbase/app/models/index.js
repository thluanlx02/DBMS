const hbase = require("hbase");
const config = { host: "127.0.0.1", port: 8080 };
const client = new hbase.Client(config);

module.exports = client;