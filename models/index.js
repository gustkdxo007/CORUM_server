const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development"; // 개발단계일때 / 배포때는 production
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
); // config에 내용 가져옴

const db = {};

db.Sequelize = Sequelize; // 패키지
db.sequelize = sequelize; // 인스턴스, sequelize를 모듈화 해서 사용할것
db.post = require("./post")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.hashtag = require("./hashtag")(sequelize, Sequelize);

/*
1 대 1 (hasOne, belongsTo)
1 대 다(hasMany, belongsTo)
다 대 다 (belongsToMany)
*/
db.user.hasMany(db.post, {
  foreignKey: "poster",
  souceKey: "id"
});

db.post.belongsTo(db.user, {
  foreignKey: "poster",
  targetKey: "userId"
});

db.post.belongsToMany(db.hashtag, { through: "PostHashtag" });
db.hashtag.belongsToMany(db.post, { through: "PostHashtag" });

module.exports = db;
