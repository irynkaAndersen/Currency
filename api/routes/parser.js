const express = require("express");
const parsePage = require("../controllers/parser");

const router = express.Router();

router.post("/", function (req, res) {
  res.send({ //mock value
    unique_tags: ["div", "a", "p"],
    most_used_tag: "div",
    longest_path: "div,div,div,div",
  });
});

module.exports = router;
