const express = require("express");
const server = express();
const port = process.env.PORT || 5555;
const routes = require("./routes/routes");

server.use(express.json());
server.use("/", routes);

server
  .listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err.message);
  });
