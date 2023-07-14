const express = require("express");
const { CreateInvoice } = require("../controllers/invoiceController");
const { Protect } = require("../controllers/authController");
const route = express.Router();

route.route("/").post(Protect, CreateInvoice);

module.exports = route;
