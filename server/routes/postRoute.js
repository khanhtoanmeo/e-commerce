const express = require("express");
const { CreatePost, UploadImage } = require("../controllers/postController");
const { Protect } = require("../controllers/authController");

const route = express.Router();

route.route("").post(Protect, CreatePost);

route.route("/upload").post(Protect, UploadImage);

module.exports = route;
