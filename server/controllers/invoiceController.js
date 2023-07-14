const { v4 } = require("uuid");
const db = require("../models/index");

async function CreateInvoice(req, res, next) {
  try {
    const { seller_id, customer_id, product, quantity, totalPrice } = req.body;

    if (!seller_id || !customer_id || !product || !quantity || !totalPrice)
      return next(new Error("Thiếu thông tin"));
    const id = v4();
    const invoice = await db.Invoice.create({
      seller_id,
      customer_id,
      product,
      quantity,
      totalPrice,
      id,
    });
    return res.json({
      status: "Ok",
      invoice,
    });
  } catch (err) {
    next(new Error(err.err));
  }
}

module.exports = {
  CreateInvoice,
};
