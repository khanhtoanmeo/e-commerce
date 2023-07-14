module.exports = (err, req, res, next) => {
  res.json({
    status: "Fail",
    message: err.message,
  });
};
