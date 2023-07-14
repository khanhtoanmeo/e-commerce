const db = require("../models/index");
const uuid = require("uuid");
const { Op } = require("sequelize");
const validator = require("validator");
const jwt = require("jsonwebtoken");

async function CreateUser(req, res, next) {
  try {
    const id = uuid.v4();
    const { username, email, password, bankName, bankAccount } = req.body;
    const existedEmail = await db.User.findAll({
      where: {
        email,
      },
    });

    const existedUsername = await db.User.findAll({
      where: {
        username,
      },
    });

    const existedBankAccount = await db.User.findAll({
      where: {
        bankAccount,
      },
    });

    if (
      existedEmail.length ||
      existedUsername.length ||
      existedBankAccount.length
    )
      return next(
        new Error(
          "Tên người dùng hoặc email hoặc tài khoản ngân hàng đã tồn tại"
        )
      );

    if (!validator.isEmail(email)) return next(new Error("Email không hợp lệ"));
    else {
      const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
      const user = await db.User.create({
        id,
        username,
        email,
        password,
        bankName,
        bankAccount,
      });

      res.json({
        status: "Ok",
        user,
        token,
      });
    }
  } catch (err) {
    next(new Error(err.message));
  }
}

async function GetUserByID(req, res, next) {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (!user) {
      res.json({ status: "Fail", message: "Không tồn tại người dùng" });
    } else {
      res.json({
        status: "Ok",
        user: user.dataValues,
      });
    }
  } catch (err) {
    next(new Error(err.message));
  }
}

async function GetMyPosts(req, res, next) {
  try {
    const { id } = req.params;
    const posts = await db.Post.findAll({
      where: {
        user_id: id,
      },
    });

    return res.json({ status: "Ok", posts });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function GetMyInvoices(req, res, next) {
  try {
    const { id } = req.params;
    const invoices = await db.Invoice.findAll({
      where: {
        [Op.or]: [{ customer_id: id }, { seller_id: id }],
      },
    });

    return res.json({ status: "Ok", invoices });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function GetOthersPosts(req, res, next) {
  try {
    const { id } = req.params;
    const posts = await db.Post.findAll({
      where: {
        user_id: {
          [Op.ne]: id,
        },
      },
    });

    return res.json({ status: "Ok", posts });
  } catch (err) {
    next(new Error(err.message));
  }
}

module.exports = {
  GetUserByID,
  CreateUser,
  GetMyPosts,
  GetOthersPosts,
  GetMyInvoices,
};
