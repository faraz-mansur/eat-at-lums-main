import "./Menu.css";
import Menu from "./Menu";

const Pdc = () => {
  const eateryId = window.location.pathname.split(":")[1];
  const menuItems = [
    { id: 1, quantity: 0, name: "Arabian Green Salad", price: 230 },
    { id: 2, quantity: 0, name: "Fattoush", price: 200 },
    { id: 3, quantity: 0, name: "Hummus", price: 180 },
    { id: 4, quantity: 0, name: "Falafel 4PCS", price: 200 },
    { id: 5, quantity: 0, name: "Cheese Fries", price: 200 },
    { id: 6, quantity: 0, name: "Manakish Be Laham", price: 200 },
    { id: 7, quantity: 0, name: "Manakish Zaatar", price: 180 },
    { id: 8, quantity: 0, name: "Special Shawarma Platter", price: 550 },
    { id: 9, quantity: 0, name: "Special Sheshtouk Platter", price: 600 },
    { id: 10, quantity: 0, name: "Lebanese Beef Burger", price: 380 },
    { id: 11, quantity: 0, name: "Lebanese Chicken Burger", price: 350 },
    { id: 12, quantity: 0, name: "Chicken Gyro Rice", price: 350 },
    { id: 13, quantity: 0, name: "Beef Gyro Rice", price: 400 },
    { id: 14, quantity: 0, name: "ShishTouk Gyro Rice", price: 450 },
    { id: 15, quantity: 0, name: "Chicken Shawarma", price: 300 },
    { id: 16, quantity: 0, name: "Beef Shawarma", price: 320 },
    { id: 17, quantity: 0, name: "ShishTouk Shawarma", price: 400 },
    { id: 18, quantity: 0, name: "Falafel Shawarma", price: 200 },
    { id: 19, quantity: 0, name: "ShishTouk", price: 450 },
    { id: 20, quantity: 0, name: "Basbousa", price: 100 },
  ];

  menuItems.forEach((item) => {
    item.eateryId = eateryId;
    item.eatery = "PDC";
  });

  return <Menu name={"PDC"} menuItems={menuItems} />;
};

export default Pdc;
