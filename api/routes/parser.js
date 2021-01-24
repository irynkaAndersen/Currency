const express = require("express");
const getPage = require("../controllers/parser");

const router = express.Router();

router.post("/", function (req, res) {
  res.send(getPage(req.body.url));
});

module.exports = router;
