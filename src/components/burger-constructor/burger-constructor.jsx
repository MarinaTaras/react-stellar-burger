import React from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement, CurrencyIcon,
  DragIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from "../../utils/data";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

function BurgerConstructor() {
  //находим булку из data.js
  const bun = data.find(item => item.type === "bun");
  // начинки и соусы 
  const units = data.filter(item => item.type !== "bun");

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

  ingridientList.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired
  }

  return (
    <div className={styles.main}>
      <div className={styles.component}>
        <ConstructorElement type="top" thumbnail={bun.image} price={bun.price} text={`${bun.name} (верх)`} isLocked={true} />
      </div>

      <div className={`${`custom-scroll`} ${styles.items}`} >
        {ingridientList(units)}
      </div>

      <div className={styles.component}>
        <ConstructorElement type="bottom" thumbnail={bun.image} price={bun.price} text={`${bun.name} (низ)`} isLocked={true} />
      </div>


      <div className={styles.result}>
        <div className={styles.price}>
          <p className={`${styles.alignment} text text_type_digits-medium`}>610</p>
          <CurrencyIcon type="primary" className={styles.alignment} />
        </div>
        <Button htmlType="button" type="primary" size="medium" style={{ width: '215px' }} >
          Оформить заказ
        </Button>
      </div>
    </div>

  )
}

export default BurgerConstructor