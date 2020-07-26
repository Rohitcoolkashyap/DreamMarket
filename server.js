const express = require("express");
const app = express();
require("./utils/connectDb");
const cors = require("cors");

const bodyParser = require("body-parser");
const productsRoute = require("./routes/products/products");
const port = process.env.PORT || 5000;
// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes

app.use("/", productsRoute);
app.listen(port, () => console.log("Listening on port " + port));
