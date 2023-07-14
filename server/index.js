const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const invoiceRoute = require("./routes/invoiceRoute");
const globalErrorHandler = require("./controllers/errorController");

dotenv.config({ path: ".env" });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/invoices", invoiceRoute);

app.use(globalErrorHandler);

app.listen(process.env.PORT, () =>
  console.log("Listening on port " + process.env.PORT)
);
