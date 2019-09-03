let { user } = require('../models');

module.exports = async (req, res) => {
  // const idStore = req.body.idStore; // 임시 확인용. JWT 기능으로 대체필요
  try {
    let result = await user.findAll({
      // where: {
      //   // userId: idStore  // 임시 확인용. JWT 기능으로 대체필요
      // }
    });
    console.log('controller get /user');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}