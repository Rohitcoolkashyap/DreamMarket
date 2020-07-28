const express = require("express");
const router = express.Router();
const Cart = require("../../models/Cart");
const jwt = require("jsonwebtoken");
const config = require("../../config");
router.get("/", async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization");
  }
  try {
    const { userId } = jwt.verify(req.headers.authorization, config.JWT_SECRET);
    const cart = await Cart.findOne({
      user: userId,
    }).populate({
      path: "products.product",
      model: "Product",
    });
    res.status(200).json(cart.products);
  } catch (error) {
    res.status(403).send("Please login again rohit");
  }
});

module.exports = router;
