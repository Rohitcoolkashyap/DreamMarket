const express = require("express");
const app = express();
require("./utils/connectDb");
const cors = require("cors");
const bodyParser = require("body-parser");
const productsRoute = require("./routes/products/products");
const signupRoute = require("./routes/user/signup");
const loginRoute = require("./routes/user/signin");
const adminRoute = require("./routes/admin.router");

const port = process.env.PORT || 5000;

// admin panel
app.use("/admin", adminRoute);
// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes

app.use("/", productsRoute);
app.use("/api/signin", loginRoute);
app.use("/api/signup", signupRoute);
app.listen(port, () => console.log("Listening on port " + port));
