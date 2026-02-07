const express = require("express");
const server = express();
const router = require("./routeTest");

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("/", router);

module.exports = server;
