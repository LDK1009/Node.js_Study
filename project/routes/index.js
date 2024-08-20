const express = require("express");

const router = express.Router();

// GET / 라우터
router.route("/")
  .get((req, res) => {
    res.send("Hello, Root get");
  })
  .post((req, res) => {
    res.send("Hello, Root post");
  });

module.exports = router;
