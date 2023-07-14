const express = require("express");
const { Login } = require("../controllers/authController");

const route = express.Router();

route.route("/login").post(Login);

module.exports = route;
