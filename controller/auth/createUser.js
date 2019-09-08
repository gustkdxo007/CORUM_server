let { user } = require("../../models/index");
const { generateToken } = require("../../lib/token");
const hash = require("../../lib/hash.js");

module.exports = async (req, res) => {
  try {
    let { userId, nickname, password } = req.body;
    password = hash(password);
    const payload = {
      userId,
      password
    };
    // TODO: create user
    const create = async value => {
      if (value) {
        throw new Error("userId exists");
      } else {
        let account = await user.create({ userId, nickname, password });
        return account;
      }
    };

    // TODO: send message
    const onError = error => {
      res.status(409).json({
        message: error.message
      });
    };

    // TODO: find by username
    const findByUsername = async userId => {
      return await user.findOne({ where: { userId } });
    };

    // TODO: createToken
    const createToken = async account => {
      let token = await generateToken(payload);
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 1
      });
      res.status(200).send(account);
    };

    // TODO: 실행
    findByUsername(userId)
      .then(create)
      .then(createToken)
      .catch(onError);
  } catch (e) {
    console.error(e);
    res.status(500).send("500 ERROR");
  }
};
