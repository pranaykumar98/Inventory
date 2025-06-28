const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  purchaseProduct,
} = require("../controllers/productController");

router.get("/products", getAllProducts);
router.post("/purchase", purchaseProduct);

module.exports = router;
