// 설치 ( 처음 시작시 스키마 가 없을수 있음 , 커멘드창에 sequelize db:create 하면만들어짐 )
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

// 참조 실행
const { post, user, auth } = require("./routes");
const { sequelize } = require("./models");
const passportConfig = require("./passport");

// 메인 실행
const app = express();
sequelize.sync(); // 스키마에 테이블 생성
passportConfig(passport);

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // 본문을 해석해줌
app.use(express.urlencoded({ extended: false })); // 해석한것을 /routes/users의 req.body로 보내준다.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
app.use(flash()); // 일회성 메세지 보내줌
app.use(passport.initialize()); // 미들웨어 , password  초기화, passport를 초기화해주면 user 정보가 req.user로 들어가게 된다.
app.use(passport.session()); // local 로그인일때 세션

app.use(post);
app.use(user);
app.use(auth);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")} 번 포트에서 서버 실행중입니다.`);
});
