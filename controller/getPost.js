let { user, post, hashtag } = require("../models");

module.exports = async (req, res) => {
  try {
    // 조회
    let retrievedPost = await post.findOne({
      attributes: ["contents", "category", "id", "visit_count"],
      where: { id: req.params.id }
    });
    let vcount = retrievedPost.dataValues.visit_count + 1;
    await post.update(
      {
        visit_count: vcount
      },
      {
        where: { id: req.params.id }
      }
    );
    delete retrievedPost.dataValues.visit_count;
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
