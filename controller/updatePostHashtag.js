let { user, post, hashtag } = require("../models");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  try {
    const token = req.body.access_token;
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: "unauthorized"
        });
      } else if (Date.now() < decoded.exp) {
        res.status(401).send({
          success: false,
          message: "time out"
        });
      } else if (req.body.userId === decoded.userId) {
        let retrievedPost = await post.findOne({
          attributes: ["userId"],
          where: { id: req.params.id }
        });

        if(retrievedPost.dataValues.userId === req.body.userId){
          await post.update({
            title: req.body.title,
            subTitle: req.body.subTitle,
            contents: req.body.contents,
            category: req.body.category
          }, {
            where: { id: req.params.id }
          });
          res.status(200).send("Updated");
        } else {
          res.status(401).send({
            success: false,
            message: "does not have right to modify this post"
          });
        }
      } else {
        throw new Error("invalid body");
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// hashtag 갱신 작업필요
