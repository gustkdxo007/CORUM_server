let express = require('express');
let { getAllPosts } = require('../controller');

let router = express.Router();

router.get('/', (req, res) => {
  console.log('router get /  ');
  getAllPosts(req, res);
});

module.exports = router;