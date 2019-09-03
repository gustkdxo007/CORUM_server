let { user, post, hashtag } = require("../models");

module.exports = async (req, res) => {
  try {
    await post.destroy({
      where: { id: req.params.id }
    });

    console.log("joined table: ");
    console.log("------------------------------this is excuted 2");

    res.status(200).send("Deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
};
