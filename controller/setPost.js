let { user, post, hashtag } = require("../models");

module.exports = async (req, res) => {
  console.log(["HEREEEEEEEEEEEEEEEEEE"], req.body);
  try {
    await post.create({
      title: req.body.title,
      subTitle: req.body.subTitle,
      contents: req.body.contents,
      category: req.body.category,
      poster: req.body.poster
    });

    res.status(200).send("Created");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
};
