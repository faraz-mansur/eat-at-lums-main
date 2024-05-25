import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Route/Route";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    id: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorsObj = {};
    if (!userData.id) {
      errorsObj.id = "ID is required";
    }
    if (!userData.password) {
      errorsObj.password = "Password is required";
    }

    if (Object.keys(errorsObj).length === 0) {
      setErrors({});

      try {
        let res = await axios.post(`${BASE_URL}/api/loginuser`, userData);
        if (res.data?.authToken) {
          localStorage.setItem("auth_token", res.data?.authToken);
          localStorage.setItem("name", res.data.name);
          window.location.href = "/";
        }
      } catch (error) {
        if (error.response.status === 400) {
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
          <h1 className="welcome-tag">Welcome to Eat@LUMS!</h1>
          <label htmlFor="email" className="form-label">
            ID
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter LUMS ID"
            id="ud"
            name="id"
            onChange={handleChange}
            value={userData.id}
          />
          {errors?.id && <div className="error">{errors?.id}</div>}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              id="password"
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
            <Link to="/signup">Don't have an account?</Link>
          </div>
          <div style={{ marginTop: "12px" }}>
            <Link to="/adminlogin">Are you an admin?</Link>
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

export default Login;
