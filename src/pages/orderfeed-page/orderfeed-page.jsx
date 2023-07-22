
import styles from './orderfeed-page.module.css';

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from 'react-redux'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import OrdersHistory from '../../components/orders-history/orders-history';
import OrdersCount from '../../components/orders-count/orders-count';
import { wsConnect } from '../../services/actions/feed-actions';
import { wsUrl } from '../../services/store';
//import { state } from '../../services/state';
import { feedReducer } from '../../services/reducers/feed-reduser';

import { rootReducer } from '../../services/reducers/index'

function OrderFeedPage() {
  const dispatch = useDispatch()
  const store = useStore()
  const { items, loading, errors } = useSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(wsConnect(wsUrl))
  }, []);

  const orders = useSelector((state) => state.feedReducer);

  return (
    <main className={styles.main}>
      <h2 className={`${styles.text} text text_type_main-large pt-10 pb-5`}>Лента заказов</h2>
      {loading && <span>Загрузка ...</span>}
      {errors && <span>{errors}</span>}
      <DndProvider backend={HTML5Backend}>
        <div className={styles.container}>
          <section className={styles.section_history}>
            <OrdersHistory />
          </section>

          <section className={styles.section_count}>
            <OrdersCount />
          </section>
        </div>
      </DndProvider>
    </main>
  )
}

export default OrderFeedPage