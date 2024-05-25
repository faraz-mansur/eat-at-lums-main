import "./Menu.css";
import Menu from "./Menu";

const Fusion = () => {
  const eateryId = window.location.pathname.split(":")[1];
  let menuItems = [
    { id: 1, quantity: 0, name: "Beef Enchilada Roll", price: 380 },
    { id: 2, quantity: 0, name: "Chicken Grilled Burger", price: 400 },
    { id: 3, quantity: 0, name: "Chicken Zinger Burger", price: 380 },
    {
      id: 4,
      quantity: 0,
      name: "Chicken Chili Dry w White Rice",
      price: 450,
    },
    {
      id: 5,
      quantity: 0,
      name: "Thai Green Curry w White Rice",
      price: 500,
    },
    { id: 6, quantity: 0, name: "Chicken Enchilada Roll", price: 380 },
    { id: 7, quantity: 0, name: "Chicken Fajita Wrap", price: 300 },
    {
      id: 8,
      quantity: 0,
      name: "Chicken Penne Pasta w White Sauce",
      price: 300,
    },
    { id: 9, quantity: 0, name: "Chicken Spring Roll", price: 200 },
    { id: 10, quantity: 0, name: "Fresh Dates", price: 40 },
    { id: 11, quantity: 0, name: "Grilled Chicken Sandwich", price: 330 },
    {
      id: 12,
      quantity: 0,
      name: "Grilled Chicken Sandwich w Cheese",
      price: 360,
    },
    { id: 13, quantity: 0, name: "Ice Cream (per scoop)", price: 80 },
    { id: 14, quantity: 0, name: "Mint Lemonade", price: 90 },
    { id: 15, quantity: 0, name: "Rooh Afza", price: 80 },
    { id: 16, quantity: 0, name: "Vege Pakora", price: 70 },
    { id: 17, quantity: 0, name: "Vegetable Samosa 2pcs", price: 50 },
    { id: 18, quantity: 0, name: "Vegetable Samosa 1pc", price: 25 },
  ];

  menuItems.forEach((item) => {
    item.eateryId = eateryId;
    item.eatery = "fusion";
  });

  return <Menu name={"Fusion Cafe"} menuItems={menuItems} />;
};

export default Fusion;
