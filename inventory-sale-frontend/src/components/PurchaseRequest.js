import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const PurchaseRequest = ({ products, fetchProducts }) => {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [finalPricing, setFinalPricing] = useState();

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const handlePricing = () => {
    {
      products?.map((product) => {
        console.log("product check", product);
        console.log("product check1", productId);
        if (product?.id === productId) {
          const markedUpPrice = product.price * 1.2;
          const discountedPrice = markedUpPrice * (1 - discount / 100);
          const finalPrice = discountedPrice * quantity;
          console.log("finalpricing", finalPrice);
          setFinalPricing(finalPrice);
        }
      });
    }
  };

  const handlePurchase = async () => {
    if (!productId || quantity < 1) {
      setMessage("⚠️ Please select a product and valid quantity.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/purchase`, {
        productId,
        quantity: Number(quantity),
        discount: Number(discount),
      });
      setMessage(`✅ Final Price: ₹${res.data.finalPrice}`);
      fetchProducts();
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.error || "Purchase failed"}`);
    } finally {
      setLoading(false);
    }
  };

  const gettingPring = async () => {
    let price;
    products?.forEach((product) => {
      if (product?.id === productId) {
        price = product?.price;
      }
    });

    if (!price) return;

    try {
      const res = await axios.post(`${API_BASE}/getCalculations`, {
        price,
        quantity: Number(quantity),
        discount: Number(discount),
      });

      console.log("resresresresresres", res);
      setFinalPricing(res.data.finalPrice);
    } catch (error) {
      console.error("Error calculating final price:", error);
    }
  };

  const handleDiscount = (e) => {
    console.log("discount one got called");
    setDiscount(e.target.value);
    gettingPring();
  };

  useEffect(() => {
    handlePricing();
  }, [discount]);

  useEffect(() => {
    gettingPring();
  }, [discount, productId, quantity]);

  return (
    <div className="sale-form">
      <h2>🛒 Make a Sale</h2>

      <div className="form-group">
        <label>Product:</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">--Select--</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </div>

      <div className="form-group">
        <label>Discount (%):</label>
        <input
          type="number"
          value={discount}
          onChange={handleDiscount}
          min="0"
          max="100"
        />
      </div>
      <div>
        <p>Pricing</p>
        <p>{finalPricing || 0}</p>
      </div>

      <button onClick={handlePurchase} disabled={loading}>
        {loading ? "Processing..." : "Checkout"}
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PurchaseRequest;
