let { user, post } = require("../models");
const Sequelize = require("sequelize");
module.exports = async (req, res) => {
  try {
    let postsByCategory = await post.findAll({
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
      where: { category: req.body.category }
    });
    res.status(200).json(postsByCategory);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
};