import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../Route/Route";
import { myHeaderGet, myHeaderPost } from "../../config/headers";
import "./PendingOrders.css";

const PendingOrders = () => {
  // User states
  const [orders, setOrders] = useState([]);
  const [accorders, setAccOrders] = useState([]);
  const [showPopup, setshowPopup] = useState(false);

  //  to fetch orders from backend
  useEffect(() => {
    axios.get(`${BASE_URL}/api/orders/all`, myHeaderGet).then((data) => {
      setOrders(data.data);
    });
  }, []);

  //  to  handle order acceptance
  const handleOrderAccept = (order_id) => {
    const data = {
      order_id: order_id,
    };
    axios
      .post(`${BASE_URL}/api/orders/accept`, data, myHeaderPost)
      .then((res) => {
        if (res.data.success) {
          setOrders(
            orders.filter((elem) => {
              return elem.order_id !== order_id;
            })
          );

          setAccOrders(
            orders.filter((elem) => {
              return elem.order_id === order_id;
            })
          );
        }
        setshowPopup(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/delorders`, { accorders: accorders });
  };

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
    //<div div className="outside">
    <div className="po_container_style">
      {orders.map((order) => {
        return (
          <div className="po_box_style">
            <p>
              <span className="po_order_label">
                Order No # {order.order_id}
              </span>{" "}
              {/* add order number from backend here */}
            </p>
            <p>
              <span className="po_name_label">Name:</span>{" "}
              {order.student_details[0]?.name}
            </p>
            <p>
              <span className="po_sid_label">Student Contact:</span>{" "}
              {order.student_details[0]?.contact}
            </p>
            <p>
              <span className="po_sid_label">Student ID:</span>{" "}
              {order.student_details[0]?.id}{" "}
            </p>
            <p>
              <span className="po_sid_label">Total Price:</span>{" "}
              {order?.totalprice}
            </p>
            <p>
              <span className="po_sid_label">Payment Method:</span>{" "}
              {order?.paymentmethod}
            </p>
            <p>
              <span className="po_sid_label">Drop Location:</span>{" "}
              {order?.droplocation}
            </p>
            <p>
              <span className="po_sid_label">Eatery:</span>{" "}
              {order.eatery_details[0]?.name}
            </p>
            <div className="po_button-div">
              <button
                className="po_button"
                onClick={() => handleOrderAccept(order.order_id)}
                style={{ margin: "5px" }}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}

      {/* Conditionally render the modal based on the state variable */}
      {showPopup && (
        <div className="po_main">
          <div className="po_second">
            <button
              className="po_button1"
              onClick={() => setshowPopup(false)}
              style={{ marginRight: "130px" }}
            >
              x
            </button>
            <div
              className="po_title"
              style={{ paddingTop: "2%", textAlign: "center" }}
            >
              <h3>Order Accepted!</h3>
              <p>See MyOrders to see your current orders</p>
            </div>
            <div className="po_encase_button">
              <button className="po_button2" onClick={() => handleClick()}>
                Go to Delivery orders
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    //</div>
  );
};

export default PendingOrders;
