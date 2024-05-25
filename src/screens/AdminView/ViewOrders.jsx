import axios from "axios";
import { useState, useEffect } from "react";
import BASE_URL from "./Route";
import "./Admin.css";

export const ViewOrders = () => {
  const [Orders, setOrders] = useState([]);
  const eat_id = localStorage.getItem("eat_id");
  const obj = { id: eat_id };
  console.log("eat id", eat_id);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/orders/eat_orders/${eat_id}`,
        obj
      );
      setOrders(res.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 style={{ color: "white" }}>{localStorage.getItem("name")}</h1>
      {Orders.map((item) => (
        <div key={item._id} className="order-box">
          <p>name: {item.item}</p>
          <p>quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};
