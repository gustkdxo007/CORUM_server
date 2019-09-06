const localStorage = require("passport-local").Strategy;
const { user } = require("../models");

// urlencoded 미들웨어가 해석한 req.body의 값들을
// usernameFiled, passwordField에 연결함
module.exports = passport => {
  passport.use(
    new localStorage(
      {
        usernameField: "email", // req.body.email
        passwordField: "password" // req.body.pw
      },
      async (email, password, done) => {
        // form 즉 회원가입 창에서 쳤을때의 값들이 여기로 온다.
        //done(에러, 성공, 실패))
        try {
          const getUser = await user.find({ where: { email } });
          if (getUser) {
            // 비밀번호 검사
            const result = await bcrypt.compare(password, getUser.password); // 사용자가 타이핑한것과 getUser(db에 있는 pw) 비교
            if (result) {
              done(null, getUser); // 성공시 serializeUser의 첫번째 인자( user ) 로 간다(index.js)
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
