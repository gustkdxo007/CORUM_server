const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "1d"
  });
}

// new Promise((resolve, reject) => {
// });

exports.generateToken = generateToken;
