import React from "react";
import { useState, useReducer, useContext } from 'react'
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement, CurrencyIcon,
  DragIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerIngredientsContext, BurgerOrderContext } from "../../services/burgerContext";
import getOrder from "../../utils/order-api";

function BurgerConstructor() {

  const data = useContext(BurgerIngredientsContext)
  const { items } = data
  const [order, setOrder] = useState()


  function submitOrderNumber() {
    const idArr = items.map(item => item._id)
    getOrder(idArr).then((res) => {
      setOrder(res.order.number)
      setVisible(true)
      })
  }

  //находим булку из data.js
  const buns = items.filter(item => item.type === "bun");
  // начинки и соусы 
  const units = items.filter(item => item.type !== "bun");

  const [visible, setVisible] = useState(false)

  const closeModal = () => {
    setVisible(false)
  }

  const modal = (
    <Modal onClose={closeModal}>
      <BurgerOrderContext.Provider value={order}>
        <OrderDetails />
      </BurgerOrderContext.Provider>
    </Modal>
  )
  //константа стоимости заказа
  // const orderPrice = { price: null }

  const ingridientList = (items) => {

    return (
      <>
        {items.map((item) => {
          return (

            <div key={item._id} className={styles.component}>
              <DragIcon type="primary" />
              <ConstructorElement thumbnail={item.image} price={item.price} text={item.name} />
            </div>

          )
        })}
      </>
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.component}>
        {buns.length > 0 &&
          <ConstructorElement type="top" thumbnail={buns[0].image} price={buns[0].price} text={`${buns[0].name} (верх)`} isLocked={true} />
        }
      </div>

      <div className={`${`custom-scroll`} ${styles.items}`} >
        {ingridientList(units)}
      </div>

      <div className={styles.component}>
        {buns.length > 0 &&
          <ConstructorElement type="bottom" thumbnail={buns[0].image} price={buns[0].price} text={`${buns[0].name} (низ)`} isLocked={true} />
        }
      </div>


      <div className={styles.result}>
        <div className={styles.price}>
          <p className={`${styles.alignment} text text_type_digits-medium`}>{data.total}</p>
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
  data: PropTypes.arrayOf(ingredientPropType)
}

export default BurgerConstructor