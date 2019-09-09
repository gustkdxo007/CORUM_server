const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
let { hashtag, post, posthashtag } = require("../models");

module.exports = async (req, res) => {
  try {
    // 지울 게시글의 id를 params로 받고 그 아이디로 posthashtag 를 hashtag 와 leftjoin하여 값을 받아낸 후
    // 그 hashtag를 돌면서 count가 1이면 제거, 1보다 크면 -1 하는

    // let hashtag_to_be_updated = await posthashtag.findAll({
    //   include: [{ model: hashtag, require: false, attributes: ["name", "count"] }],
    //   where: { post_id: req.params.id }
    // })
    // console.log("[hashtag_to_be_updated]", hashtag_to_be_updated);
    // for (let obj of hashtag_to_be_updated) {
    //   if (obj.hashtag.count > 1) {
    //     await hashtag.update({ count: obj.hashtag.count - 1 });
    //   } else if (obj.hashtag.count === 1) {
    //     await hashtag.destroy({ where: { name: obj.hashtag.name } });
    //   }
    // }
    const token = req.cookies.access_token;
    console.log("----------------------------------------------1");
    jwt.verify(token, secret, async (err, decoded) => {
      console.log("-------------------------------2");
      console.log("req.body.userId: ", req.body.userId);
      console.log("decoded.userId: ", decoded.userId);
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
        console.log("----------------------------------------3");
        await post.destroy({
          where: { id: req.params.id }
        });
        res.status(200).send("Deleted");
      } else {
        throw new Error("invalid body");
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
  console.log("------------------------5");
};

// 이하의 백업 기능은 시간상 추후 구현
// 지우는 날짜만 추가됨
// 주기적으로 delete_at 날짜와 현재 날짜의 차이가 일정량 이상인
// 데이터들을 자동으로 지우는 알고리즘 필요
