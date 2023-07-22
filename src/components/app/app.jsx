import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import RegistrationPage from "../../pages/registration-page/registration-page";
import HomePage from "../../pages/home-page/home-page";
import LoginPage from "../../pages/login-page/login-page";
import ForgotpasswordPage from "../../pages/forgotpassword-page/forgotpassword-page";
import ResetpasswordPage from "../../pages/resetpassword-page/resetpassword-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import { OnlyAuth, OnlyUnAuth } from "../protected-route-element/protected-route-element";
import { checkUserAuth } from "../../utils/user-api";
import Modal from "../modal/modal";
import IngredientDetailsPage from "../../pages/ingredientdetails-page";
import OrderFeedPage from "../../pages/orderfeed-page/orderfeed-page";
import OrderInfo from "../../pages/orderinfo-page/orderinfo-page";
import EditProfile from "../edit-profile/edit-profile";
import OrdersHistory from "../orders-history/orders-history";
import AuthOrdersHistory from "../auth_orders-history/auth_orders-history";
import AuthOrderInfo from "../../pages/auth_orderinfo-page/auth_orderinfo-page";
import { ingredientsRequest } from "../../services/actions/api-actions";

function App() {

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate();
  const background = location.state && location.state.background;


  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  useEffect(() => {
    dispatch(ingredientsRequest())
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.page}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<OrderFeedPage />} />
          <Route path="/feed/:id" element={<OrderInfo />} />
          <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
          <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} >
            <Route path="profile" element={<EditProfile />} />
            <Route path="orders" element={<AuthOrdersHistory />} />
          </Route >
          <Route path="/profile/orders/:id" element={<OnlyAuth component={<AuthOrderInfo />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotpasswordPage />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetpasswordPage />} />} />
          <Route path='/ingredients/:ingredientId' element={<IngredientDetailsPage />} />
          {/* <Route path={orders} element={<OnlyAuth component={<ProfileOrdersPage />} />} /> */}

        </Routes>
        {background && (
          <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal onClose={handleModalClose}>
                  <IngredientDetailsPage />
                </Modal>
              }
            />
            <Route
              path='/feed/:id'
              element={
                <Modal onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:id'
              element={
                <Modal onClose={handleModalClose}>
                  <AuthOrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
