const products = require("../models/productModel");
// controllers/productController.js
const calculateFinalPrice = require("../utils/calculateFinalPrice");

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.purchaseProduct = (req, res) => {
  const { productId, quantity, discount = 0 } = req.body;
  console.log("checking", req.body);

  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });
  if (quantity > product.stock)
    return res.status(400).json({ error: "Insufficient stock" });

  const finalPrice = calculateFinalPrice(product.price, quantity, discount);
  product.stock -= quantity;

  res.json({
    finalPrice,
    updatedStock: product.stock,
  });
};

exports.getCalculations = (req, res) => {
  const { price, quantity, discount = 0 } = req.body;
  const finalPrice = calculateFinalPrice(price, quantity, discount);
  console.log("checkingforfinalprice", finalPrice);
  res.json({ finalPrice });
};
