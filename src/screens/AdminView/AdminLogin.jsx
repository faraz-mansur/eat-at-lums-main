import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "./Route";
// import "../Login/Login.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorsObj = {};
    if (!userData.username) {
      errorsObj.username = "username is required";
    }
    if (!userData.password) {
      errorsObj.password = "password is required";
    }

    if (Object.keys(errorsObj).length === 0) {
      setErrors({});
      try {
        let res = await axios.post(`${BASE_URL}/api/adminlogin`, userData);
        console.log(res.data);
        // localStorage.setItem("username", res.data.username)
        localStorage.setItem("name", res.data.eat_name);
        localStorage.setItem("eat_id", res.data.eat_id);
        localStorage.setItem("admin", true);

        window.location.href = "/adminhome";
      } catch (error) {
        if (error.response.status === 400) {
          console.log("errors ", error);
          const message = await error.response.data;
          errorsObj.server = message["errors"][0].msg;
          setErrors(errorsObj);
        } else {
          // generic error handling
          errorsObj.server = "An error occurred. Please try again later.";
          setErrors(errorsObj);
        }
      }
    } else {
      setErrors(errorsObj);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-box">
          <h1 className="welcome-tag">Hello, Admin!</h1>
          <label htmlFor="email" className="form-label">
            username
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter LUMS username"
            username="ud"
            name="username"
            onChange={handleChange}
            value={userData.username}
          />
          {errors?.username && <div className="error">{errors?.username}</div>}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              username="password"
              name="password"
              onChange={handleChange}
              value={userData.password}
            />
            {errors?.password && (
              <div className="error">{errors?.password}</div>
            )}
          </div>
          <button type="submit" className="div-submitButton">
            Submit
          </button>
          <div style={{ marginTop: "12px" }}>
            <Link to="/login">Are you an user?</Link>
          </div>

          {errors?.server && (
            <div style={{ color: "red" }} className="error">
              {errors?.server}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
