const express = require("express");
const router = express.Router();
const data = require("../../data");
router.get("/api/products", async (req, res) => {
  try {
    res.status(200).json(data.Products);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
router.get("/api/product/:productId", async (req, res) => {
  const id = req.params.productId;

  try {
    const product = await data.Products.find((x) => x._id === parseInt(id));
    if (product) res.status(200).json(product);
    else res.status(401).json({ message: "product not found" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
router.post("/api/products", (req, res) => {});
router.put("/api/products:productId", (req, res) => {});
router.delete("/api/products:productId", (req, res) => {});

module.exports = router;
