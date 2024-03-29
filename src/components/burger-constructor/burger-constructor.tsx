import React, { useCallback } from "react";
import { useState } from 'react'
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { CALC_ORDER_PRICE, SORT_ITEMS } from "../../services/actions/actions";
import { useDrop } from "react-dnd";
import { ConstructorItem } from "../constructor-item/constructor-item";
import { postOrderRequest } from "../../services/actions/api-actions";
import { getCookie } from "../../utils/get-cookie";
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, TIngredient, TState, useAppDispatch, useAppSelector } from "../../services/types";

type TProps = {
  onDropHandler: (item: TIngredient) => void
}

function BurgerConstructor({ onDropHandler }: TProps ) {

  const dispatch = useDispatch()
  const items = useAppSelector((state: TState) => state.constructorIngredients);

  const totalPrice = useAppSelector((state: TState) => state.orderPrice)
  //const [order, setOrder] = useState()
  const cookie = getCookie('token');
  const navigate = useNavigate()
  const user = useAppSelector((state: TState) => state.auth.user);
  const location = useLocation();

  //реализация перетаскивания
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item as TIngredient);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });


  //стоимость заказа
  const calcOrderPrice = {
    type: CALC_ORDER_PRICE,
    data: items
  }
  dispatch(calcOrderPrice)


  function submitOrderNumber() {

    if (!user) return navigate("/login", { replace: true });

    const idArr = items.map((item) => item._id)
    dispatch(postOrderRequest(idArr))
    setVisible(true)

  }

  //находим булку из data.js
  const buns = items?.filter((item: TIngredient) => item.type === "bun");

  // начинки и соусы 
  const units = items?.filter((item: TIngredient) => item.type !== "bun");

  const [visible, setVisible] = useState(false)

  const closeModal = () => {
    setVisible(false)
  }

  const modal = (
    <Modal onClose={closeModal}>

      <OrderDetails />

    </Modal>
  )

  const moveHandler = useCallback(
    (dragIndex, hoverIndex) => {
      const sortItems = {
        type: SORT_ITEMS,
        data: { dragIndex, hoverIndex }
      }
      dispatch(sortItems);
    },
    [dispatch]
  );

  return (
    <div className={styles.main}>
      <div className={styles.drop} ref={dropTarget} >
        <div className={styles.component}>
          {buns?.length > 0 &&
            <ConstructorElement type="top" thumbnail={buns[0].image} price={buns[0].price} text={`${buns[0].name} (верх)`} isLocked={true} />
          }
        </div>

        <div className={`${`custom-scroll`} ${styles.items}`} >
          {units?.map((item: TIngredient, idx: number) => <ConstructorItem
            ingredientItem={item} key={idx} moveHandler={moveHandler} />)}
        </div>

        <div className={styles.component}>
          {buns?.length > 1 &&
            <ConstructorElement type="bottom" thumbnail={buns[1].image} price={buns[1].price} text={`${buns[1].name} (низ)`} isLocked={true} />
          }
        </div>

      </div>

      <div className={styles.result}>
        <div className={styles.price}>
          <p className={`${styles.alignment} text text_type_digits-medium`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button"
          type="primary" size="medium"
          style={{ width: '215px' }}
          onClick={() => submitOrderNumber()}
        >
          Оформить заказ
        </Button>

        {visible && modal}
      </div>
    </div>

  )
}


export default BurgerConstructor