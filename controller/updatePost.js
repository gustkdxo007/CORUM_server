let { user, post, hashtag } = require("../models");

module.exports = async (req, res) => {
  try {
    await post.update(
      {
        title: req.body.title,
        subTitle: req.body.subTitle,
        contents: req.body.contents,
        category: req.body.category,
        poster: req.body.poster
      },
      {
        where: { id: req.params.id }
      }
    );
    res.status(200).send("Updated");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
};
