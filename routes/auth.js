// 설치
let express = require("express");
let router = express.Router();
let passport = require("passport");
const bcrypt = require("bcrypt");

// 참조
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { user } = require("../models");

// POST /auth/join 회원가입
router.post("/auth/join", isNotLoggedIn, async (req, res, next) => {
  // isNotLoggedIn 으로 한번 걸러줌
  const { userId, nickname, password } = req.body; // 프론트에서 타이핑한것
  try {
    const getUser = await user.find({ where: { userId } });
    if (getUser) {
      req.flash("joinError", "이미 가입된 이메일입니다.");
      return res.redirect("/auth/join");
    }
    // console.time("암호화 시간"); 1초 까지 되게하라
    const hash = await bcrypt.hash(password, 10);
    // console.timeEnd('암호시간끝')
    await user.create({
      userId,
      nickname,
      password: hash
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /auth/login  로그인
router.post("/auth/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    // authenticate 가 passport의 localStrategy 호출시킴
    // 로컬스토리지에 done 값들이다. authError = error, user = 성공, info = 실패
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("loginError", info.message);
      return res.redirect("/");
    }
    return req.login(user, loginError => {
      // req.user 에서 사용자 정보 찾을수있음,
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  });
});

// GET /logout
router.get("/auth/logout", isLoggedIn, (req, res, next) => {
  req.logout(); // passport가 알아서 지워줌
  req.session.save(function() {
    // 현재 세션 상태를 savr 시키고 다시 redirect
    res.redirect("/");
  });
});

// Google - Login

// login-flow  ( 1 )
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["http://www.googleapis.com/auth/plus.login", "email"]
    // 구글에게 로그인 승인창 요청 , email 도 달라고 요청, "profile" 도요청?
  })
); // passport로 googleStategy.js 실행

// ( 3 ) => (2 , 4) /passport/googleStrategy
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login"
  }),
  (req, res) => {
    // 성공했을때
    res.redirect("/");
  }
);
/*
(“/auth/google”로 가요) => 
(passport strategy가 구글에 인증요청) => 
(Google 이 http프로토콜로 코드를 보내줘요) =>
(passport가 다시 그 코드를 받고 한번더 구글에게 사용자 정보를 요청해요)
*/
// 프론트에서 이것만 설정하면됨
//<a href="/auth/google">Sign In with Google</a>

// GitHub - Login

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github",
  passport.authenticate("github", {
    failureRedirect: "/"
  }),
  (req, res) => {
    // 성공하면 메인페이진
    res.redirect("/");
  }
);
module.exports = router;
