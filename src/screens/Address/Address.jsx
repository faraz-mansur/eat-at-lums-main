import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../Route/Route";
import "./Address.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const Address = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [Submitted, setSubmitted] = useState(false);
  const location = useLocation();

  const { data, myHeaderPost } = location.state || {};

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Set the droplocation value to the user's address
    const droplocation = address;

    // Add the droplocation to the data object
    const dataWithAddress = {
      ...data,
      droplocation,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/api/orders/checkout`,
        dataWithAddress,
        myHeaderPost
      );

      localStorage.removeItem("cartState");
      setSubmitted(true);
      const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
      };

      clearCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div>
      <div className="progress-tracker">
        <div className="add_circles">
          <div className={`add_circle1`}>
            <div className="add_number1">1</div>
          </div>
          <div className={`add_line1`}></div>
          <div className={`add_circle2`}>
            <div className="add_number1">2</div>
          </div>
          <div className={`add_line2`}></div>
          <div className={`add_circle3`}>
            <div className="add_number1">3</div>
          </div>
        </div>
        <div className="add_labels">
          <div className="add_label1">Menu</div>
          <div className="add_label2">Cart</div>
          <div className="add_label3">Checkout</div>
        </div>
      </div>
      <div className="add_inv-div">
        <div className="add_cart-container">
          <div className="add_title">Delivery details</div>
          <div className="address-container">
            {Submitted ? (
              <div className="confirmation-message">
                <p>
                  Order confirmed! View it in{" "}
                  <Link to="/usrorders">Orders</Link>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="add-text-box">
                  <label className="add-label">
                    Address:
                    <input
                      type="text"
                      value={address}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <label className="random-info">
                  You will be notified with an affirmation of delivery once a
                  rider confirms and picks up your order!
                </label>
                <div className="add-button-div">
                  <button className="del-button2" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
