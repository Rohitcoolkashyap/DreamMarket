const express = require("express");
const router = express.Router();
const Product = require("../../models/products/productModel");
router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
router.get("/api/product/:productId", async (req, res) => {
  const _id = req.params.productId;
  try {
    const product = await Product.findOne({ _id });
    if (product) res.status(200).json(product);
    else res.status(401).json({ message: "product not found" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
router.post("/api/product", async (req, res) => {
  const { name, price, description, countInStock, image } = req.body;
  try {
    if (!name || !price || !description || !countInStock || !image) {
      return res.status(422).send("Product missing fields");
    }
    const product = await new Product({
      name,
      price,
      description,
      countInStock,
      image,
    }).save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send("Server error creating product");
  }
});
router.put("/api/products:productId", (req, res) => {});
router.delete("/api/products:productId", (req, res) => {});

module.exports = router;
