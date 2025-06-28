import React from "react";
import "../App.css";

const Dashboard = ({ products }) => {
  return (
    <div className="dashboard">
      <h2>📦 Product Inventory</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <h3>{p.name}</h3>
            <p>Price: ₹{p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
