import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../Route/Route";
import { myHeaderGet } from "../../config/headers";
import "./UserOrders.css";
import Dropdown from "../../components/Dropdown/Dropdown";

const UserOrders = () => {
  // User states
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Event Handlers

  const handleClick = (order_id, rider_name, rider_contact,rider_id) => {
    const data = { order_id, rider_name, rider_contact, rider_id};
    navigate("/trackorder", { state: data });
  };

  //  to fetch user specific orders from backend
  useEffect(() => {
    axios.get(`${BASE_URL}/api/orders/usr`, myHeaderGet).then((data) => {
      setOrders(data.data);
    });
  }, []);

  // styling
  const boxStyle = {
    width: "25%",
    border: "5px solid brown",
    margin: "25px",
  };

  const flexContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  // rendered component
  return (
    <div className="container_style">
      {orders.map((order) => {
        return (
          <div className="box_style">
            <p>
              <span className="order_label">Order No # {order.order_id}</span>{" "}
            </p>
            <p>
              <span className="name_label">Rider Name:</span>{" "}
              {order.rider_details[0]?.name}
            </p>
            <p>
              <span className="sid_label"> Rider Contact:</span>{" "}
              {order.rider_details[0]?.contact}
            </p>
            <p>
              <span className="sid_label">Rider ID:</span>{" "}
              {order.rider_details[0]?.id}{" "}
            </p>
            <p>
              <span className="sid_label">Total Price:</span>{" "}
              {order?.totalprice}
            </p>
            <p>
              <span className="sid_label">Payment Method:</span>{" "}
              {order?.paymentmethod}
            </p>
            <p>
              <span className="sid_label">Drop Location:</span>{" "}
              {order?.droplocation}
            </p>
            <p>
              <span className="sid_label">Eatery:</span>{" "}
              {order.eatery_details[0]?.name}
            </p>
            <Dropdown order_id={order.order_id} items={order.items} />
            <div className="uo_button-div">
              <button
                className="uo_button2"
                onClick={() =>
                  handleClick(
                    order.order_id,
                    order.rider_details[0]?.name,
                    order.rider_details[0]?.contact,
                    order.rider_details[0]?.id
                  )
                }
              >
                Track Order
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserOrders;
