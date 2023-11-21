import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authSlice";
import Profile from "./components/pages/profile/Profile";
import ProductDetail from "./components/pages/productDetail/ProductDetail";

import Cart from "./components/pages/cart/Cart";

const App = () => {
  axios.defaults.withCredentials = false;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          draggable
          pauseOnHover
          theme="light"
        />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product-details/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
        
      </BrowserRouter>
     
    </>
  );
};

export default App;
