let express = require("express");
let {
  getAllPosts,
  getPostsbyCategory,
  getPost,
  setPost,
  updatePost,
  deletePost
} = require("../controller");

let router = express.Router();
console.log(["ROTUER-UPDATE"], router.update);
// 전체 게시물 조회
router.get("/getAllPosts", (req, res) => {
  console.log("[ ROUTER ] /getAllPosts  ");
  getAllPosts(req, res);
});

router.get("/getPostsbyCategory", (req, res)=>{
  console.log("[ ROUTER ] /getPostsbyCategory  ");
  getPostsbyCategory(req, res);
})

router.get("/getPost/:id", (req, res) => {
  console.log("[ ROUTER ] /getPost  ");
  getPost(req, res);
});

router.post("/setPost", (req, res) => {
  setPost(req, res);
});

router.patch("/updatePost/:id", (req, res) => {
  updatePost(req, res);
});

router.delete("/deletePost/:id", (req, res) => {
  deletePost(req, res);
});

// router.post("/asdf",(req,res) => {
//   console.log(["BODDDDDYYY"],req.body);
//   res.status(200).send('hihihihihihihihihihihihihi')
// })

module.exports = router;
