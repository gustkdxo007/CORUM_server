let express = require("express");
let { readUserInfo } = require("../controller");
let router = express.Router();

router.get("/readUserInfo", (req, res) => {
  console.log("router get /readUserInfo ");
  readUserInfo(req, res);
});

module.exports = router;
