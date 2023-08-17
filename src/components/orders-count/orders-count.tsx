import { useSelector } from 'react-redux';
import { feedReducer } from '../../services/reducers/feed-reduser';

import styles from './orders-count.module.css'
import { TOrder, TState } from '../../services/types';


function OrdersCount() {

  const { total, totalToday, orders } = useSelector((state: TState) => state.feed);
  const doneOrders = orders.filter((order: TOrder) => order.status === 'done')
  const pendingOrders = orders.filter((order: TOrder) => order.status !== 'done')
  return (
    <div className={styles.container}>
      <div className={styles.orders_list}>
        <div className={styles.orders_status}>
          <p className='text text_type_main-medium pb-6'>Готовы:</p>
          <ul className={styles.orders}>
            {doneOrders && doneOrders.map((order, index) => {
              return (
                <li key={index} className={`${styles.order} ${styles.order_done} text text_type_digits-default`}>{order.number}</li>
              )
            })}
          </ul>
        </div>
        <div className={styles.orders_status}>
          <p className='text text_type_main-medium pb-6'>В работе:</p>
          <ul className={styles.orders}>
            {pendingOrders && pendingOrders.map((item, index) => {
              return (
                <li className={`${styles.order} text text_type_digits-default`}>{item.number}</li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className={styles.total}>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className={`${styles.total_sum} text text_type_digits-large`}>{total}</p>
      </div>
      <div className={styles.total}>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={`${styles.total_sum} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </div>
  )
}

export default OrdersCount