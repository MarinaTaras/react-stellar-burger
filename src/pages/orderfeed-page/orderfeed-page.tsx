
import styles from './orderfeed-page.module.css';

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from 'react-redux'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import OrdersHistory from '../../components/orders-history/orders-history';
import OrdersCount from '../../components/orders-count/orders-count';
import { wsConnect, wsDisconnect } from '../../services/actions/feed-actions';
import { wsUrl } from '../../services/store';
//import { state } from '../../services/state';
import { feedReducer } from '../../services/reducers/feed-reduser';

import { rootReducer } from '../../services/reducers/index'
import { TState, useAppDispatch, useAppSelector } from '../../services/types';

function OrderFeedPage() {
  const dispatch = useAppDispatch()
  const store = useStore()
  const { items, loading, errors } = useSelector((state: TState) => state.ingredients);

  useEffect((): ()=>void => {
    dispatch(wsConnect(wsUrl))
    return () => dispatch(wsDisconnect())
  }, [dispatch]);

  const orders = useAppSelector((state: TState) => state.feed);

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