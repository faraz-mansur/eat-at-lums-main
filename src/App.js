import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import Home from "./screens/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PendingOrders from "./screens/PendingOrders/PendingOrders";
import DeliveryOrders from "./screens/DeliveryOrders/DeliveryOrders";
import UserOrders from "./screens/UserOrders/UserOrders";
import TrackOrder from "./screens/TrackOrder/TrackOrder";
import Eatery from "./screens/Eateries/Eateries";
import { Provider } from "react-redux";
import store from "./components/Cart/CartFunctions";
import Pdc from "./screens/Menu/Pdc";
import Cupcake from "./screens/Menu/Cupcake";
import Fusion from "./screens/Menu/Fusion";
import GreenOlive from "./screens/Menu/GreenOlive";
import Cart from "./components/Cart/Cart";
import { Address } from "./screens/Address/Address";
import AdminLogin from "./screens/AdminView/AdminLogin";
import { ViewOrders } from "./screens/AdminView/ViewOrders";
import Reviews from "./screens/Reviews/Reviews";

const { Outlet } = require("react-router-dom");

const Protectedroutes = () => {
  console.log(localStorage.getItem("auth_token"));
  return localStorage.getItem("auth_token") ? <Outlet /> : <Login />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          <Route exact path="/adminhome" element={<ViewOrders />} />

          {/*  Protected Routes */}
          <Route element={<Protectedroutes />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/eateries" element={<Eatery />} />
            <Route exact path="/menu/PDC/:id" element={<Pdc />} />
            <Route
              exact
              path="/menu/Green Olive/:id"
              element={<GreenOlive />}
            />
            <Route exact path="/menu/Fusion/:id" element={<Fusion />} />
            <Route
              exact
              path="/menu/Cupcake Lounge/:id"
              element={<Cupcake />}
            />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/address" element={<Address />} />
            <Route exact path="/pendingorders" element={<PendingOrders />} />
            <Route exact path="/delorders" element={<DeliveryOrders />} />
            <Route exact path="/usrorders" element={<UserOrders />} />
            <Route exact path="/trackorder" element={<TrackOrder />} />
            <Route path="/reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
