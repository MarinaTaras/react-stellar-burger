import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './orderinfo-page.module.css'
import IngredientsInfo from '../../components/ingredients-info/ingredients-info';
import { ingredientsRequest } from '../../services/actions/api-actions';
import { feedReducer } from '../../services/reducers/feed-reduser';
import { wsUrl } from '../../services/store';
import { wsConnect } from '../../services/actions/feed-actions';

function OrderInfo() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(wsConnect(wsUrl))
  }, []);
  //все заказы
  const orders = useSelector((state) => state.feedReducer.orders);
 
  const { id } = useParams()
  // в момент, когда данных нет, не выдает ошибку:
  const emptyItem = {
    createdAt: "",
    ingredients: [],
    name: "",
    number: null,
    status: "",
    updatedAt: "",
    _id: ""
  }
  // для поиска заказа преобразовываем id в число
  const number = Number(id);
  const order = orders.find((order) => order.number === number) || emptyItem

  return (
    <div className={styles.container}>
      <div className={styles.order_number}>
        <p className='text text_type_digits-default'>#{order.number}</p>
      </div>
      <div className={styles.order_info}>
        <p className='text text_type_main-medium pt-10'>{order.name}</p>
        <p className={`${styles.status} text text_type_main-default pt-3`}>{order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : 'Выполнен'}
        </p>
      </div>
      <h3 className={`align-self={"start"} text text_type_main-medium pt-15`}>Состав:</h3>
      <div className={`${'custom-scroll'} `} >
        <IngredientsInfo order={order} />
      </div>
    </div>
  )
}

export default OrderInfo