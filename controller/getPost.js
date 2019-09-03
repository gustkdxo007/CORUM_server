let { user, post, hashtag } = require("../models");

module.exports = async (req, res) => {
  try {
    // 조회
    let retrievedPost = await post.findAll({
      attributes: ["contents", "category", "id"],
      where: { id: req.params.id }
    });

    console.log("joined table: ", allPosts);
    console.log("------------------------------this is excuted 2");

    res.status(200).json(retrievedPost);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
};

// let post = await post.find({
//   attributes: ["contents", "category", "id"],
//   where: { id: req.body.postId }
// });
// const hashtags = await post.getHashtags();
