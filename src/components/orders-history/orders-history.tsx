import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './orders-history.module.css'
import OrderContents from '../order-contents/order-contents';
import { TState } from '../../services/types';

function OrdersHistory() {

  const location = useLocation();
  const orders = useSelector((state: TState) => state.feed.orders);

  return (
    <div className={`${'custom-scroll'}  ${styles.container}`} >
      <>
        {orders && orders.map((order, index) => {
         const id = order.number
          return (
            <Link
              to={{ pathname: `/feed/${id}`}} state = {{ background: location }} 
              className={`${styles.link}`} key={order._id}>
              <OrderContents order={order} status={false} key={index} />
            </Link>)
        }
        )}
      </>
    </div>
  )
}

export default OrdersHistory