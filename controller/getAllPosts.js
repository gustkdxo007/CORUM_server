let { user, post } = require('../models');
const Sequelize = require('sequelize');
// console.log('post:', post);
module.exports = async (req, res) => {
  try {
    // console.log('------------------------------this is excuted')
    let allPosts = await post.findAll({
      attributes: ['title', 'subtitle', 'createdAt', 'visit_count', 'like_count'],
      include: [{ model: user, require: false, attributes: ['nickname', 'userImage'] }],
    });
    console.log('joined table: ', allPosts);
    console.log('------------------------------this is excuted 2')

    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).send(err.message);
  }
}