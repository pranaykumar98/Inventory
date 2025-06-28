const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  purchaseProduct,
  getCalculations,
} = require("../controllers/productController");

router.get("/products", getAllProducts);
router.post("/purchase", purchaseProduct);
router.post("/getCalculations", getCalculations);

module.exports = router;
