let express = require('express');
let { getUserInfo } = require('../controller');
let router = express.Router();

router.get('/user', (req, res) => {
  console.log('router get /user  ');
  getUserInfo(req, res);
});

module.exports = router;