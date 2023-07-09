import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { ingredientsRequest } from "../../services/actions/api-actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ADD_CONSTRUCTOR_INGRIDIENT, CHANGE_COUNT } from "../../services/actions/actions";
import { useStore } from 'react-redux'
import { v4 as uuidv4 } from "uuid"
import RegistrationPage from "../../pages/registration-page/registration-page";
import HomePage from "../../pages/home-page/home-page";
import LoginPage from "../../pages/login-page/login-page";
import ForgotpasswordPage from "../../pages/forgotpassword-page/forgotpassword-page";
import ResetpasswordPage from "../../pages/resetpassword-page/resetpassword-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import { OnlyAuth, OnlyUnAuth } from "../protected-route-element/protected-route-element";
import { checkUserAuth } from "../../utils/user-api";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import IngredientDetailsPage from "../../pages/ingredientdetails-page";

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

  return (
      <div className={styles.app}>
        <div className={styles.page}>
          <AppHeader />
            <Routes location={background || location}> 
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
              <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
              <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
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
        </Routes>
      )}
        </div>
      </div>
  );
}

export default App;
