let express = require("express");
let {
  readAllPostList,
  readPostListbyCategory,
  readPostListbyHashtag,
  readPost,
  createPostHashtag,
  updatePostHashtag,
  deletePostHashtag
} = require("../controller");

let router = express.Router();
// 전체 게시물 조회
router.get("/readAllPostList", (req, res) => {
  console.log("[ ROUTER ] /readAllPosts  ");
  readAllPostList(req, res);
}); // clear

router.get("/readPostListbyCategory/:category", (req, res)=>{
  console.log("[ ROUTER ] /readPostListbyCategory/:category  ");
  readPostListbyCategory(req, res);
});  //clear

router.get("/readPostListbyHashtag/:tagname", (req, res)=>{
  console.log("[ ROUTER ] /readPostListbyHashtag/:tagname  ");
  readPostListbyHashtag(req, res);
});

router.get("/readPost/:id", (req, res) => {
  console.log("[ ROUTER ] /readPost/:id  ");
  readPost(req, res);
});  //clear

router.post("/createPostHashtag", (req, res) => {
  console.log("[ ROUTER ] /createPostHashtag  ");
  createPostHashtag(req, res);
});

router.patch("/updatePostHashtag/:id", (req, res) => {
  console.log("[ ROUTER ] /updatePostHashtag/:id  ");
  updatePostHashtag(req, res);
}); // on delete cascade 옵션이 posthashtag table에 잘 실행되는지 확인해야함

router.delete("/deletePostHashtag/:id", (req, res) => {
  console.log("[ ROUTER ] /deletePostHashtag/:id  ");
  deletePostHashtag(req, res);
}); // on delete cascade 옵션이 posthashtag table에 잘 실행되는지 확인해야함

module.exports = router;
