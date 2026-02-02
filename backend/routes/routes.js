const { express } = require("express");
const router = express.Router();
const remote = require("../controls/remote");

router.get("/", remote.startTimer);
