import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuItems from "../../components/MenuItems/MenuItems";
import "./Menu.css";
import Menu from "./Menu";

const Cupcake = () => {
  const eateryId = window.location.pathname.split(":")[1];

  const menuItems = [
    { id: 1, quantity: 0, name: "Plain Cake", price: 40 },
    { id: 2, quantity: 0, name: "Assorted Muffin", price: 80 },
    { id: 3, quantity: 0, name: "Chocolate Mousse Cake", price: 130 },
    { id: 4, quantity: 0, name: "Chicken Patties", price: 70 },
    { id: 5, quantity: 0, name: "Chicken Pizza", price: 180 },
    { id: 6, quantity: 0, name: "Chicken Cheese Burger", price: 250 },
    { id: 7, quantity: 0, name: "Chicken Shawarma", price: 200 },
    { id: 8, quantity: 0, name: "Chicken Sandwich", price: 130 },
    { id: 9, quantity: 0, name: "Chicken Sandwich (Bran Bread)", price: 140 },
    { id: 10, quantity: 0, name: "Assorted Tart", price: 40 },
  ];

  menuItems.forEach((item) => {
    item.eateryId = eateryId;
    item.eatery = "cupcake";
  });
  return <Menu name={"Cupcake Lounge"} menuItems={menuItems} />;
};

export default Cupcake;
