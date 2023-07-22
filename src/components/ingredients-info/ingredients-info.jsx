import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, ReactNode, useEffect, useMemo } from 'react';

import styles from './ingredients-info.module.css'
import { useDispatch, useSelector } from 'react-redux';


function IngredientsInfo({ order }) {
  const dispatch = useDispatch();

  let orderDate = order.createdAt
  let orderIngredients = order.ingredients
  let orderlength = orderIngredients.length
  let orderPrice = 0

  // находим все ингредиенты для заполнения списка
  const { items, loading, errors } = useSelector(state => state.ingredients)
  // функция для нахождения одинаковых ингредиентов
  const ingedientCount = (itemId) => {
    const ingredientsList= order.ingredients.filter(
      (ingredient) => ingredient === itemId
    );
    return ingredientsList.length;
  };

  const getIngredients = () => {

    orderIngredients.map((ingredient) => {
      const item = items && items.find((item) => item._id === ingredient)
      if (item) orderPrice += item.price
     
      return orderPrice
    }
    )

    return orderIngredients && [...new Set(orderIngredients)].map((ingredient, index) => {
      const item = items && items.find((item) => item._id === ingredient)


      return (

        <li className={styles.ingredient} key={index}>
          <div className={styles.ingredient_base}>
            <div className={styles.ingredient_image}>
              <img className={`${styles.iimage}`} src={item.image} alt="ingredient" />
            </div>
            <p className={`${styles.text} text text_type_main-default pl-4`}>{item.name}</p>
          </div>

          <div className={styles.price}>
            <p className='text text_type_digits-default pr-2'> {ingedientCount(ingredient)} x {item.price} </p> 
            <CurrencyIcon type="primary" /> {/*key={uniqid()}*/}
          </div>
        </li>
      )
    }
    )
  }


  return (
    <>
      <div className={`${'custom-scroll'} ${styles.container}`}>
        <ul className={styles.order_list}>
          {getIngredients()}
        </ul>
      </div>
      <div className={`${styles.total} pb-10`}>
        <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(orderDate)} />
        <div className={styles.total_price}>
          <p className='text text_type_digits-default pr-2'>{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  )

}

export default IngredientsInfo
//export const total = orderPrice