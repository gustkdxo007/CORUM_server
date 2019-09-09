let { user } = require("../models");

module.exports = async (req, res) => {
  // const idStore = req.body.idStore; // 임시 확인용. JWT 기능으로 대체필요
  console.log("req.cookies.access_token: ", req.cookies.access_token);
  try {
    let result = await user.findAll({
      // where: {
      //   // userId: idStore  // 임시 확인용. JWT 기능으로 대체필요
      // }
    });
    console.log("controller get /readUserInfo");
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
};
