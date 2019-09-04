let { user, post, hashtag } = require("../models");

module.exports = async (req, res) => {
  try {
    await post.destroy({
      where: { id: req.params.id }
    });
    res.status(200).send("Deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
};
// 지우는 날짜만 추가됨
// 주기적으로 delete_at 날짜와 현재 날짜의 차이가 일정량 이상인 
// 데이터들을 자동으로 지우는 알고리즘 필요