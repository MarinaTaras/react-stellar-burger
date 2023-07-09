import React, { useCallback } from "react";
import { useState, useEffect } from 'react'
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement, CurrencyIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
//import { BurgerIngredientsContext, BurgerOrderContext } from "../../services/burgerContext";
//import getOrder from "../../utils/order-api";
import { useDispatch, useSelector } from "react-redux";
import { CALC_ORDER_PRICE, SORT_ITEMS } from "../../services/actions/actions";
import { useDrop } from "react-dnd";
import { ConstructorItem } from "../constructor-item/constructor-item";
import { postOrderRequest } from "../../services/actions/api-actions";
import { getCookie } from "../../utils/get-cookie";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { authReducer } from "../../services/reducers/auth-reduser";

function BurgerConstructor({ onDropHandler }) {

  const dispatch = useDispatch()
  const items = useSelector(state => state.constructorIngredients);
  const totalPrice = useSelector(state => state.orderPrice)
  //const [order, setOrder] = useState()
  const cookie = getCookie('token');
  const navigate = useNavigate
  const user = useSelector((state) => state.authReducer.user);
  const location = useLocation();

  console.log('user', user)
  //реализация перетаскивания
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });


  //стоимость заказа
  const calcOrderPrice = {
    type: CALC_ORDER_PRICE,
    data: items
  }
  dispatch(calcOrderPrice)


  function submitOrderNumber() {
    if (user === null) { return (
          <Navigate to="/login" replace={true} />
        )}
    else {
      const idArr = items.map(item => item._id)
      return (
        dispatch(postOrderRequest(idArr)),
        setVisible(true))
    }
  }

  //находим булку из data.js
  const buns = items?.filter(item => item.type === "bun");

  // начинки и соусы 
  const units = items?.filter(item => item.type !== "bun");

  const [visible, setVisible] = useState(false)

  const closeModal = () => {
    setVisible(false)
  }

  const modal = (
    <Modal onClose={closeModal}>

      <OrderDetails />

    </Modal>
  )

  const moveHandler = useCallback(
    (dragIndex, hoverIndex) => {
      const sortItems = {
        type: SORT_ITEMS,
        data: { dragIndex, hoverIndex }
      }
      dispatch(sortItems);
    },
    [dispatch]
  );

  return (
    <div className={styles.main}>
      <div className={styles.drop} ref={dropTarget} >
        <div className={styles.component}>
          {buns?.length > 0 &&
            <ConstructorElement type="top" thumbnail={buns[0].image} price={buns[0].price} text={`${buns[0].name} (верх)`} isLocked={true} />
          }
        </div>

        <div className={`${`custom-scroll`} ${styles.items}`} >
          {units?.map((item, idx) => <ConstructorItem
            ingredientItem={item} key={idx} idx={idx} moveHandler={moveHandler} />)}
        </div>

        <div className={styles.component}>
          {buns?.length > 1 &&
            <ConstructorElement type="bottom" thumbnail={buns[1].image} price={buns[1].price} text={`${buns[1].name} (низ)`} isLocked={true} />
          }
        </div>

      </div>

      <div className={styles.result}>
        <div className={styles.price}>
          <p className={`${styles.alignment} text text_type_digits-medium`}>{totalPrice}</p>
          <CurrencyIcon type="primary" className={styles.alignment} />
        </div>
        <Button htmlType="button"
          type="primary" size="medium"
          style={{ width: '215px' }}
          onClick={() => submitOrderNumber()}
        >
          Оформить заказ
        </Button>

        {visible && modal}
      </div>
    </div>

  )
}

BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(ingredientPropType)
}

export default BurgerConstructor