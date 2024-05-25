import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./TrackOrder.css";
import { socket } from "../../socket/socketio";
import BASE_URL from "../../Route/Route";
import { myHeaderPost } from "../../config/headers";

// estabishing connection with user

const TrackOrder = () => {
  const [showPopup, setshowPopup] = useState(false);
  const [process, setProcess] = useState(true);
  const [onway, setOnway] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reported, setReported] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // fetching current order status
    const orderId = location.state.order_id;
    const myData = {
      order_id: orderId,
    };
    axios
      .post(`${BASE_URL}/api/orders/status`, myData, myHeaderPost)
      .then((data) => {
        if (data.data.status === "Delivered") {
          setOnway(true);
          setDelivered(true);
        } else if (data.data.status === "Picked") {
          setOnway(true);
        }
        setLoading(false);
      });
    // making a new connection with socket
    const myBody = {
      userId: localStorage.getItem("auth_token"),
    };
    socket.emit("newUser", myBody);
  }, []);
  socket.on("track", (data) => {
    if (data.status === "Delivered") {
      setOnway(true);
      setDelivered(true);
    } else if (data.status === "Picked") {
      setOnway(true);
    }
    socket.off("track");
  });

  const handleReportRiderClick = async (e) => {
    e.target.innerText = "Reported";
    if (reported) {
      const reportRider = {
        riderID: location.state.rider_id,
        orderID: location.state.order_id,
      };
      try {
        const res = await axios.post(
          `${BASE_URL}/api/reportrider`,
          reportRider,
          myHeaderPost
        );
        setReported(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("USER HAS ALREADY REPORTED THE RIDER");
    }
  };
  function handleContactDetailsClick() {
    setshowPopup(true);
  }
  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="layer">
          <div className="title">Order Number: {location.state.order_id}</div>
          <div className="circles">
            <div className={`circle1${process ? "_mustard" : ""}`}>
              <div className="number1">1</div>
            </div>
            <div className={`line1${onway ? "_mustard" : ""}`}></div>
            <div className={`circle2${onway ? "_mustard" : ""}`}>
              <div className="number1">2</div>
            </div>
            <div className={`line2${delivered ? "_mustard" : ""}`}></div>
            <div className={`circle3${delivered ? "_mustard" : ""}`}>
              <div className="number1">3</div>
            </div>
          </div>
          <div className="labels">
            <div className="label1">Preparing order</div>
            <div className="label2">Delivering</div>
            <div className="label3">Order Delivered </div>
          </div>
          <div className="buttons">
            <button
              className="rider_button"
              onClick={(e) => handleReportRiderClick(e)}
            >
              <div className="contact_rider">Report Rider</div>
            </button>
            <button
              className="rider_button"
              onClick={() => handleContactDetailsClick()}
            >
              <div className="contact_rider">Contact Rider</div>
            </button>
          </div>
          {showPopup && (
            <div className="hello">
              <div className="rider_details">
                <button
                  className="close"
                  onClick={() => setshowPopup(false)}
                  style={{ marginRight: "130px" }}
                >
                  x
                </button>
                <div
                  className="rider-details"
                  style={{ paddingTop: "2%", textAlign: "center" }}
                >
                  <h3>Rider details</h3>
                  <p>Name: {location.state.rider_name}</p>
                  <p>Number: {location.state.rider_contact}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TrackOrder;
