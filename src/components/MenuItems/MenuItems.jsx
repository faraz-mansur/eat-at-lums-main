import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./MenuItems.css";

const MenuItems = ({ id, name, price, eatery, quantity, eateryId }) => {
  const [disperror, setdisperror] = useState(false);
  const [cartQuantity, setcartQuantity] = useState(0);

  const dispatch = useDispatch();
  const lastCartItem = useSelector(
    (state) => state.cart.cartItems[state.cart.cartItems.length - 1]
  );
  const cartItems = useSelector((state) => state.cart.cartItems);

  // to fill the quanity of item as in cart
  useEffect(() => {
    cartItems.forEach((item) => {
      if (item.name === name) {
        setcartQuantity(item.quantity);
      }
    });
  }, []);

  const addToCart = () => {
    if (!lastCartItem || lastCartItem.eatery === eatery) {
      setdisperror(false);

      dispatch({
        type: "ADD_ITEM",
        payload: { id, name, price, eatery, quantity, eateryId },
      });
      setcartQuantity(cartQuantity + 1);
    } else {
      setdisperror(true);
    }
  };

  const removeFromCart = () => {
    // no need to dispatch if quantity is already zero
    if (cartQuantity > 0) {
      dispatch({
        type: "REMOVE_ITEM",
        payload: { id, name, price, eatery, quantity, eateryId },
      });
      setcartQuantity(cartQuantity - 1);
    }
  };

  return (
    <div className="eateries-item2">
      <p style={{ fontSize: "16px", fontWeight: "bold", padding: "1px" }}>
        {name}
      </p>
      <p style={{ fontSize: "14px", padding: "1px" }}>Price: {price}</p>
      {disperror && (
        <div>
          can't add items from two different eateries, modify cart first.{" "}
        </div>
      )}
      <div className="div-button">
        <button className="button-cart" onClick={addToCart}>
          Add to cart
        </button>
        <p> {cartQuantity} </p>
        <button className="button-cart" onClick={removeFromCart}>
          Remove from cart
        </button>
      </div>
    </div>
  );
};

export default MenuItems;
