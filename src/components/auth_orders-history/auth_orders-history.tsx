import React, { EffectCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './auth_orders-history.module.css'
import OrderContents from '../order-contents/order-contents';
import { authConnect, authDisconnect } from '../../services/actions/feed_auth-actions';
import { wsAuthUrl } from '../../services/store';
import { authReducer } from '../../services/reducers/auth-reduser'
import { TAuthState, TOrder, TState } from '../../services/types';
import { TUser } from '../../services/types';



function AuthOrdersHistory() {

  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: TState) => state.auth.user);
  const background = location.state?.background;
  //находим токен, отрезаем Bearer
  const accessToken = localStorage.getItem("accessToken")?.slice(7);

  // подключаем ws
  useEffect((): ()=> void => {
    dispatch(authConnect(`${wsAuthUrl}?tokeng=${accessToken}`))
    return () => dispatch(authDisconnect())
  }, []);
  // находим заказы пользователя
  const orders = useSelector((state: TState) => state.feedAuth.orders);

  return (
    <div className={`${'custom-scroll'}  ${styles.container}`} >
      <>
        {orders && orders.map((order: TOrder, index: number) => {
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