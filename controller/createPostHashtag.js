let { post, hashtag, posthashtag } = require("../models");

module.exports = async (req, res) => {
  try {
    let last_inserted_post = await post.create({
      title: req.body.title,
      subTitle: req.body.subTitle,
      contents: req.body.contents,
      category: req.body.category,
      poster: req.body.poster
    });

    // console.log("last_inserted_post: ", last_inserted_post);

    // posthashtag 테이블 컬럼 중 hashtag_name의 on update cascade 옵션을 제거해야 한다.
    // 이 옵션때문에 hashtag 테이블에 count를 업데이트 할때 해당 해시태그를 가진 hashtag table의 로우의 post_id가 최근 업데이트된 post_id로 변경됨
    let add_hashtag = async function(element) {
      try {
        let hashtag_found = await hashtag.findOne({ where: { name: element } });
        // let postsByHashtag = await hashtag_found.getPosts({ limit: 1 }); // 그 게시물의 그 해시태그 조합인 로우가 PostHashtag 테이블에 존재하는지 체크
        // if (!postsByHashtag) {  //그 게시물의 그 해시태그 조합인 로우가 PostHashtag 테이블에 없으면 해시태그 업데이트와 추가 작업을 한다.
        if (hashtag_found) {
          // 해시태그 테이블에 등록된적이 있는 해시태그면
          let hashtag_updated = await hashtag.create(
            { count: hashtag_found.dataValues.count + 1 },
            { where: { name: element } }
          ); // 해시태그 테이블에서 카운트 + 1 한다.
          // hashtag_updated 에는 업데이트 된 로우의 업데이트 된 속성만 가지고 온다.
          await hashtag_found.setPosts(last_inserted_post.dataValues.id); // Posthashtag 테이블에 post테이블의 id와 hashtag테이블의 hashtagname을 값으로 가지는 로우를 생성함.
          // await posthashtag.create({
          //   post_id: last_inserted_post.dataValues.id,
          //   hashtag_name: element
          // });
        } else {
          // 해시태그 테이블에 등록된 적이 없는 해시태그면
          let hashtag_created = await hashtag.create({ name: element }); //hashtag 테이블에 로우 생성하고 기본 값은 1이 된다(모델 정의).
          await hashtag_created.setPosts(last_inserted_post.dataValues.id); // Posthashtag 테이블에 post테이블의 id와 hashtag테이블의 hashtagname을 값으로 가지는 로우를 생성함.
          // await posthashtag.create({
          //   post_id: last_inserted_post.dataValues.id,
          //   hashtag_name: element
          // });
          // await console.log('setPosts saved value: ', isSaved);
        }
      } catch (err) {
        // 왜 에러를 잡았을 때 이쪽으로 가지 못하나.
        console.log(err.message);
        console.log("addhashtag error");
        await res.status(500).send("function error");
      }
    };

    // const tag = await hashtag.find({ where: { name: element } });  //
    // await tag.setPosts(last_inserted_post);

    if (Array.isArray(req.body.hashtag)) {
      await Promise.all(
        req.body.hashtag.map(
          el =>
            new Promise((resolve, reject) => {
              resolve();
              return add_hashtag(el);
            })
        )
      ).then(result => res.status(200).send("Success"));
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
