import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import PurchaseRequest from "./components/PurchaseRequest";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/products`);
      setProducts(res.data);
    } catch {
      alert("❌ Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>🧾 Inventory System</h1>
      {loading ? <p>Loading...</p> : <Dashboard products={products} />}
      <hr />
      <PurchaseRequest products={products} fetchProducts={fetchProducts} />
    </div>
  );
};

export default App;
