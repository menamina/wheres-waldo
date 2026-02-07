const express = require("express");
const server = express();
const port = 5555;
const router = require("./routeTest");

server.use(express.urlencoded({ extended: false }));
server.use("/", router);

server
  .listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err.message);
  });

module.exports = server;
