const controller = {};
controller.getAllPosts = require("./getAllPosts");
controller.getUserInfo = require("./getUserInfo");
controller.getPost = require("./getPost");
controller.setPost = require("./setPost");
controller.updatePost = require("./updatePost");
controller.deletePost = require("./deletePost");
controller.getPostsbyCategory = require("./getPostsbyCategory");

module.exports = controller;
