const express = require("express");
const router = express.Router();
const remote = require("../controls/remote");

router.get("/start", remote.startTimer);
router.post("/click", remote.isClickABullseye);
router.patch("/stop", remote.stopTimer);

module.exports = router;
