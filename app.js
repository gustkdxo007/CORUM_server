const express = require("express");
// const cookieParser = require("cookie-parser");
// const morgan = require("morgan");
const path = require("path");
// const session = require("express-session");
// const flash = require("connect-flash");
const { posts, user } = require('./routes');
const { sequelize } = require('./models')

const app = express();
sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use(posts);
app.use(user);

app.set("port", process.env.PORT || 3000);

app.listen(3000, () => {
  console.log(`3000 번에 접속하였습니다.`);
});
