import React from "react";
import "./Menu.css";
import MenuItems from "../../components/MenuItems/MenuItems";
import { useNavigate } from "react-router-dom";

const Menu = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const data = {
      state: {
        eatery_id: props.menuItems[0]?.eateryId,
      },
    };
    navigate("/reviews", data);
  };

  return (
    <div className="image-background">
      <button onClick={handleClick} className="button-cart">
        Reviews
      </button>
      <h2 style={{ color: "white", marginBottom: "12px" }}>{props.name}</h2>
      <div className="eatery-container">
        {props.menuItems.map((item) => (
          <MenuItems {...item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
