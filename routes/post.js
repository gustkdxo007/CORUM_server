let express = require("express");
let {
  getAllPostList,
  getPostListbyCategory,
  getPostListbyHashtag,
  getPost,
  createPostHashtag,
  updatePostHashtag,
  deletePostHashtag
} = require("../controller");

let router = express.Router();
// 전체 게시물 조회
router.get("/getAllPostList", (req, res) => {
  console.log("[ ROUTER ] /getAllPosts  ");
  getAllPostList(req, res);
}); // clear

router.get("/getPostListbyCategory/:category", (req, res)=>{
  console.log("[ ROUTER ] /getPostListbyCategory/:category  ");
  getPostListbyCategory(req, res);
});  //clear

router.get("/getPostListbyHashtag/:tagname", (req, res)=>{
  console.log("[ ROUTER ] /getPostListbyHashtag/:tagname  ");
  getPostListbyHashtag(req, res);
});

router.get("/getPost/:id", (req, res) => {
  console.log("[ ROUTER ] /getPost/:id  ");
  getPost(req, res);
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
