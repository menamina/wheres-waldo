const express = require("express");
const router = express.Router();
const { isClickABullseye, stopTimer } = require("../controls/remote");

router.get("/start", (req, res) => {
  res.json({
    startTime: 0,
  });
});

router.post("/click", isClickABullseye);

router.patch("/stop", stopTimer);

module.exports = router;
