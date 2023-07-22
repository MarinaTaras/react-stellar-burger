import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, ReactNode, useEffect, useMemo } from 'react';
//import uniqid from 'uniqid';

import sauce_with_spikes from '../../images/sauce_with_spikes.png'

import styles from './ingredients-info.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { ingredientsRequest } from '../../services/actions/api-actions';

function IngredientsInfo({ order}) {
  const dispatch = useDispatch();

  let orderDate = order.createdAt
  let orderIngredients = order.ingredients
  let orderlength = orderIngredients.length
  let orderPrice = 0

  useEffect(() => {
    if (!items.length) dispatch(ingredientsRequest())
  }, [])
  // находим все ингредиенты для заполнения списка
  const { items, loading, errors } = useSelector(state => state.ingredients)
  

  const getIngredients = () => {

    return orderIngredients &&
      orderlength <= 5 &&
      orderIngredients.map((ingredient, index) => {
        const item = items && items.find((item) => item._id === ingredient)

        if (item) {
          orderPrice += item.price
          return (
            
            <li className={styles.ingredient} key={index}>
              <div className={styles.ingredient_base}>
                <div className={styles.ingredient_image}>
                  <img className={`${styles.iimage}`} src={item.image} alt="ingredient" />
                </div>
                <p className={`${styles.text} text text_type_main-default pl-4`}>{item.name}</p>
              </div>

              <div className={styles.price}>
                <p className='text text_type_digits-default pr-2'> {item.price} </p> {/*{count(item)} x {item.type === 'bun' ? item.price * 2 : item.price}*/}
                <CurrencyIcon type="primary" /> {/*key={uniqid()}*/}
              </div>
            </li>
          )
        }
      })
  }


  return (
    <>
      <ul className={styles.order_list}>
        {getIngredients()}
      </ul>

      <div className={`${styles.total} pb-10`}>
        <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order.createdAt)} />
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