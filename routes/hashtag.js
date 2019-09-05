let express = require("express");
let {
  getAllHashtagList
} = require("../controller");

let router = express.Router();
// 전체 게시물 조회
router.get("/getAllHashtagList", (req, res) => {
  console.log("[ ROUTER ] /getHashtagList  ");
  getAllHashtagList(req, res);
}); // clear

module.exports = router;
