// export default Navbar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import "./Navbar.css";

const HandleLogout = () => {
  localStorage.removeItem("token");
};

function Navbar() {
  const [user, setUser] = useState("");
  const isLoggedIn = localStorage.getItem("auth_token");
  const firstname = localStorage.getItem("name");
  const navigate = useNavigate();
  const [name, setname] = useState("");

  const HandleLogout = () => {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          {/* <Link className="navbar-brand fst-italic" to="/">
            eat@lums
          </Link> */}
          <Link to="/">
            <img
              src={require("./logo.png")}
              alt="logo"
              style={{ height: 40, marginRight: 25 }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <div className="centre-div">
              <ul className="navbar-nav">
                {!isLoggedIn && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/login"
                      style={{ color: "white" }}
                    >
                      Login
                    </Link>
                  </li>
                )}

                {!isLoggedIn && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/signup"
                      style={{ color: "white" }}
                    >
                      Sign up
                    </Link>
                  </li>
                )}

                {isLoggedIn && (
                  <li className="log-out">
                    <Link
                      className="nav-link"
                      to="/"
                      style={{ color: "white" }}
                    >
                      Hey, {firstname}!
                    </Link>
                  </li>
                )}

                {isLoggedIn && (
                  <li className="log-out">
                    <Link
                      className="nav-link"
                      to="/eateries"
                      style={{ color: "white" }}
                    >
                      Eateries
                    </Link>
                  </li>
                )}
                {isLoggedIn && (
                  <li className="log-out">
                    <Link
                      className="nav-link"
                      to="/pendingorders" //the orders that have to be accepted for delivery
                      style={{ color: "white" }}
                    >
                      Pending Orders
                    </Link>
                  </li>
                )}
                {isLoggedIn && (
                  <li className="log-out">
                    <Link
                      className="nav-link"
                      to="/delorders" //change to my orders
                      style={{ color: "white" }}
                    >
                      Delivery Orders
                    </Link>
                  </li>
                )}
                {isLoggedIn && (
                  <li className="log-out">
                    <Link
                      className="nav-link"
                      to="/usrorders"
                      style={{ color: "white" }}
                    >
                      My Orders
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="right-div">
              <ul className="navbar-nav">
                {isLoggedIn && (
                  <li className="cart">
                    <Link
                      className="nav-link"
                      to="/cart"
                      style={{ color: "white" }}
                    >
                      Cart
                    </Link>
                  </li>
                )}

                {isLoggedIn && (
                  <li className="log-out">
                    <Link
                      className="nav-link"
                      to="/"
                      onClick={HandleLogout}
                      style={{ color: "white" }}
                    >
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
