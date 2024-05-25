import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeliveryOrders.css";
import BASE_URL from "../../Route/Route";
import { myHeaderGet } from "../../config/headers";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import Dropdown from "../../components/Dropdown/Dropdown";
import { socket } from "../../socket/socketio";

const DeliveryOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showPopup, setshowPopup] = useState(false);
  useEffect(() => {
    axios.get(`${BASE_URL}/api/orders/rider`, myHeaderGet).then((data) => {
      setOrders(data.data);
    });
    // estabishing connection with user
    const myBody = {
      userId: localStorage.getItem("auth_token"),
    };
    socket.emit("newUser", myBody);
  }, []);

  const handleClick = async (e, orderId, customerId) => {
    // data that needs to be sent
    const data = {
      order_id: orderId,
      customer_id: customerId,
    };
    // checking the text of the button
    const buttonText = e.target.innerText.split(" ")[0];
    // sending updates
    if (buttonText === "Picked") {
      socket.emit("Picked", data);
      e.target.innerText = "Delivered";
    } else if (buttonText === "Delivered") {
      e.target.disabled = true;
      socket.emit("Delivered", data);
      e.target.innerText = "";
    }
  };

  return (
    <div className="container_style">
      {orders.map((order) => {
        return (
          <div className="box_style">
            <p>
              <span className="order_label">Order No # {order.order_id}</span>{" "}
              {/* add order number from backend here */}
            </p>
            <p>
              <span className="name_label">Name:</span>{" "}
              {order.student_details[0]?.name}
            </p>
            <p>
              <span className="sid_label">Student Contact:</span>{" "}
              {order.student_details[0]?.contact}
            </p>
            <p>
              <span className="sid_label">Student ID:</span>{" "}
              {order.student_details[0]?.id}{" "}
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

            <Dropdown
              order_id={order.order_id}
              showpopup={showPopup}
              items={order.items}
            />
            {order.orderstatus !== "Delivered" && (
              <div className="del-button-div">
                <button
                  className="del-button2"
                  onClick={(e) =>
                    handleClick(e, order.order_id, order.student_details[0]?.id)
                  }
                >
                  {order.orderstatus === "Accepted"
                    ? "Picked up"
                    : order.orderstatus === "Picked"
                    ? "Delivered"
                    : ""}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DeliveryOrders;
