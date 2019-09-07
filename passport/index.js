const google = require("./googleStrategy");
const github = require("./githubStrategy");
const local = require("./localStrategy");
const { user } = require("../models");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    // {id: 1, name: suyang, age : 26} user에 이게 다 담겨있는데 user.id만 사용한다. (다 사용하기에는 db공간활용이 극혐)
    done(null, user.userId); // session에 passport의 user에 담김니다. "passport" : { "user" : "tndid@gamil.com" } 딱한번 호출
  });
  passport.deserializeUser((id, done) => {
    // 1 번만찾아서 => {id: 1, name: suyang, age : 26} => req.user 로 보내줌
    // 모든 요청에 실행되기 때문에 DB 조회를 캐싱해서 효율적이게 만들어야함
    if (user[id]) {
      done(user[id]);
    } else {
      user
        .find({ where: { id } })
        .then(user => done(null, user))
        .catch(err => done(err));
    }
  });
  local(passport);
  google(passport);
  github(passport);
};
