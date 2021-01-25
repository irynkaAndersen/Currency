const express = require("express");
const parsePage = require("../controllers/parser");

const router = express.Router();

router.post("/", function (req, res) {
  parsePage(req.body.url).then(data => res.send((data)));
});

module.exports = router;
