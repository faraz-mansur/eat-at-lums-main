import { configureStore } from "@reduxjs/toolkit";

const cartState = localStorage.getItem("cartState");

// to increase the quauntity
const addItemHandler = (itemsList, newItem) => {
  let check = false;
  const updatedList = itemsList.map((item) => {
    if (newItem.id === item.id) {
      if (item.quantity !== 0) {
        check = true;
      }
      const newquantity = item.quantity + 1;
      return { ...item, quantity: newquantity };
    }
    return item;
  });
  if (check) {
    // if new added item is already present remove one of them
    updatedList.pop();
  }
  return updatedList;
};

const removeItemHandler = (itemsList, removeItemId) => {
  // console.log("itemsList", itemsList)
  const updatedList = itemsList
    .map((item, index) => {
      if (item.id === removeItemId) {
        if (item.quantity === 1) {
          return { ...null };
        } else {
          const newquantity = item.quantity - 1;
          return { ...item, quantity: newquantity };
        }
      }
      return item;
    })
    .filter((item) => Object.keys(item).length !== 0);
  return updatedList;
};

// checking if there any saved cart state in localstorage, if yes assign it else empty
const initialState = {
  cartItems: cartState ? JSON.parse(cartState) : [],
};

// define reducer function
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      // saving cart information in local storage
      const itemsList = [...state.cartItems, action.payload];
      const updatedCartItems = addItemHandler(itemsList, action.payload);

      // storing the updated state in local storage
      localStorage.setItem("cartState", JSON.stringify(updatedCartItems));

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case "REMOVE_ITEM":
      const filteredCartItems = removeItemHandler(
        state.cartItems,
        action.payload.id
      );

      // storing the updated state in local storage
      localStorage.setItem("cartState", JSON.stringify(filteredCartItems));
      return {
        ...state,
        cartItems: filteredCartItems,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
      
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
