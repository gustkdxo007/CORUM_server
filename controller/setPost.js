let { user, post, hashtag } = require("../models");

module.exports = async (req, res) => {
  try {
    await post.create({
      title: req.body.title,
      subTitle: req.body.subTitle,
      contents: req.body.contents,
      category: req.body.category,
      poster: req.body.poster
    });
    // let hashtag_found = await hashtag.findOne({ attributes: ["count"], where: { hashtag_name: req.body.hashtag_name } });
    // console.log('hashtag_found: ', hashtag_found);
    // if (hashtag_found) {
    //   await hashtag.update(
    //     {
    //       count: hashtag_found.dataValues.count + 1
    //     },
    //     {
    //       where: { id: req.body.hashtag_name }
    //     }
    //   );
    // }
    // await hashtag.create({
    //   hashtag_name: req.body.hashtag_name,

    // })  
    // 게시글 작성하기 버튼을 누를때 해시태그로 추가한 것들을 해시태그 테이블에 등록해야함
    res.status(200).send("Created");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
};
