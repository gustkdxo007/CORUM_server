let { user, post, hashtag } = require("../models");
module.exports = async (req, res) => {
  try {
    const tag = await hashtag.find({ where: { name: req.params.tagname } });
    const postsByHashtag = await tag.getPosts({
      attributes: [
        "id",
        "title",
        "subTitle",
        "createdAt",
        "updatedAt",
        "visit_count",
        "like_count"
      ],
      include: [
        { model: user, require: false, attributes: ["nickname", "userImage"] }
      ],
    });

    // let postsByCategory = await post.findAll({
    //   attributes: [
    //     "id",
    //     "title",
    //     "subTitle",
    //     "createdAt",
    //     "updatedAt",
    //     "visit_count",
    //     "like_count"
    //   ],
    //   include: [
    //     { model: user, require: false, attributes: ["nickname", "userImage"] }
    //   ],
    //   where: { category: req.body.category }
    // });
    res.status(200).json(postsByHashtag);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
};