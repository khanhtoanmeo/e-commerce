const db = require("../models/index");
const jwt = require("jsonwebtoken");

async function Protect(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error("Bạn chưa được cấp quyền truy cập"));
      next();
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

async function Login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await db.User.findAll({ where: { email } });

    if (!user.length) return next(new Error("Không tồn tại người dùng"));
    if (user[0].password !== password)
      return next(new Error("Mật khẩu không chính xác"));

    const token = await jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return res.json({
      status: "Ok",
      user: user[0],
      token,
    });
  } catch (err) {
    next(new Error(err.message));
  }
}

module.exports = {
  Login,
  Protect,
};
