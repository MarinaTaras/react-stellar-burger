import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './auth_orders-history.module.css'
import OrderContents from '../order-contents/order-contents';
import { authConnect, authDisconnect } from '../../services/actions/feed_auth-actions';
import { wsAuthUrl } from '../../services/store';


function AuthOrdersHistory() {

  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.authReducer.user);
  const background = location.state?.background;
  //находим токен, отрезаем Bearer
  const accessToken = localStorage.getItem("accessToken")?.slice(7);

  // подключаем ws
  useEffect(() => {
    dispatch(authConnect(`${wsAuthUrl}?tokeng=${accessToken}`))
    return () => dispatch(authDisconnect())
  }, []);
  // находим заказы пользователя
  const orders = useSelector((state) => state.feedAuthReducer.orders);

  return (
    <div className={`${'custom-scroll'}  ${styles.container}`} >
      <>
        {orders && orders.map((order, index) => {
          const id = order.number
          return (
            <Link
              to={{ pathname: `/profile/orders/${id}` }} state={{ background: location }}
              className={`${styles.link}`} key={order._id}>
              <OrderContents order={order} status={false} key={index} />
            </Link>)
        }
        )}
      </>
    </div>
  )
}

export default AuthOrdersHistory