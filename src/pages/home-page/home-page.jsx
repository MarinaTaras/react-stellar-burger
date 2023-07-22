import React, { useState } from "react";
import styles from "./home-page.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ADD_CONSTRUCTOR_INGRIDIENT, CHANGE_COUNT } from "../../services/actions/actions";
import { useStore } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";


function HomePage() {
  const dispatch = useDispatch()
  const store = useStore()
  const { items, loading, errors } = useSelector(state => state.ingredients);

  // реализация перетаскивания
  const handleDrop = (data) => {
    data.uuid = uuidv4()
    const addConstructorIngridient = {
      type: ADD_CONSTRUCTOR_INGRIDIENT,
      data
    }
    dispatch(addConstructorIngridient)
    updateCount()
  }

  function updateCount() {
    let data = {}
    const items = store.getState().constructorIngredients
    items.forEach(item => {
      if (data[item._id]) { data[item._id]++ }
      else { data[item._id] = 1 }
    })
    dispatch({ type: CHANGE_COUNT, data })
  }

  return (

    <main className={styles.main}>

      {loading && <span>Загрузка ...</span>}
      {errors && <span>{errors}</span>}
      <DndProvider backend={HTML5Backend}>

        <section className={styles.section}>
          <BurgerIngredients />
        </section>

        <section className={styles.section}>
          <BurgerConstructor onDropHandler={handleDrop} />
        </section>

      </DndProvider>
    </main>

  );
}

export default HomePage;
