const express = require("express");
const {
  CreateUser,
  GetUserByID,
  GetMyPosts,
  GetOthersPosts,
  GetMyInvoices,
} = require("../controllers/userController");
const { Protect } = require("../controllers/authController");

const route = express.Router();

route.route("").post(CreateUser);

route.route("/:id").get(Protect, GetUserByID);

route.route("/:id/myposts").get(Protect, GetMyPosts);

route.route("/:id/othersposts").get(Protect, GetOthersPosts);

route.route("/:id/invoices").get(Protect, GetMyInvoices);

module.exports = route;
