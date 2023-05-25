import React from "react";
import { useState } from 'react'
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement, CurrencyIcon,
  DragIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({ data }) {
  //находим булку из data.js
  const buns = data.filter(item => item.type === "bun");
  // начинки и соусы 
  const units = data.filter(item => item.type !== "bun");

  const [visible, setVisible] = useState(false)

  const closeModal = () => {
    setVisible(false)
  }

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails />
    </Modal>
  )

  const ingridientList = (data) => {
    return (
      <>
        {data.map((item) => {
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
          <p className={`${styles.alignment} text text_type_digits-medium`}>610</p>
          <CurrencyIcon type="primary" className={styles.alignment} />
        </div>
        <Button htmlType="button"
          type="primary" size="medium"
          style={{ width: '215px' }}
          onClick={() => setVisible(true)}
        >
          Оформить заказ
        </Button>
        {visible && modal}
      </div>
    </div>

  )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired
  }

export default BurgerConstructor