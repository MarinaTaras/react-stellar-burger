import React, { useEffect, useState } from 'react';
import { Params, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './auth_orderinfo-page.module.css'
import IngredientsInfo from '../../components/ingredients-info/ingredients-info';
import { authConnect, authDisconnect } from '../../services/actions/feed_auth-actions';
import { wsAuthUrl } from '../../services/store';
import { TOrder, TState, useAppDispatch } from '../../services/types';

function AuthOrderInfo() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const user = useSelector((state: TState) => state.auth.user);
  const background = location.state?.background;
  //находим токен, отрезаем Bearer
  const accessToken = localStorage.getItem("accessToken")?.slice(7);
  useEffect((): () => void => {
    dispatch(authConnect(`${wsAuthUrl}?tokeng=${accessToken}`))
    return () => dispatch(authDisconnect())
  }, []);

  //все заказы
  const orders = useSelector((state: TState) => state.feedAuth.orders);
  const { id } = useParams<keyof Params>() as Params;

  // в момент, когда данных нет, не выдает ошибку:
  const emptyItem: TOrder = {
    _id: '',
    ingredients: [],
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: null,
    owner: null,
    price: null,
  }

  // для поиска заказа преобразовываем id в число
  const number = Number(id);
  const order = orders.find((order: TOrder) => order.number === number) || emptyItem

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

export default AuthOrderInfo