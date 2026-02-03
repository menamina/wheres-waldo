const express = require("express");
const server = express();
const port = process.env.PORT || 5555;
const routes = require("./routes/routes");

server.use(express.json());
server.use("/", routes);

server.listen(port, (error) => {
  if (error) {
    console.log("whomp :(");
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
