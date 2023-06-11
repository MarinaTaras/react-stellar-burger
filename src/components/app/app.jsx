import React, { useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect } from "react";
import { BurgerIngredientsContext } from "../../services/burgerContext";
import { useDispatch, useSelector } from 'react-redux'
import { ingredientsRequest } from "../../services/actions/api-actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ADD_CONSTRUCTOR_INGRIDIENT, CHANGE_COUNT } from "../../services/actions/actions";
import {useStore} from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const store  = useStore()
  const { items, loading, errors } = useSelector(state => state.ingredients);
  const constructorItems = useSelector(state => state.constructorIngredients);

  // запрос к Api при монтировании App
  useEffect(() => {
    dispatch(ingredientsRequest())
  }, [])

  // реализация перетаскивания
  const handleDrop = (data) => {
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
      if (data[item._id]) {data[item._id]++}
      else {data[item._id] = 1}
    })
    dispatch({type: CHANGE_COUNT, data })
  }




  const increaseCounter = (data) => {
    let count

    if (data.type === 'bun') {
      count = 2
      } else {
        count = data.count ? data.count + 1 : 1
      }

    const changeCount = {
      type: CHANGE_COUNT,
      data: {id: data._id, count }
    }
    dispatch(changeCount)

  }

  return (

    <div className={styles.app}>
      <div className={styles.page}>
        <AppHeader />

        <main className={styles.main}>

          {loading && <span>Загрузка ...</span>}
          {errors && <span>{errors}</span>}
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredientsContext.Provider value={items}>
              <section className={styles.section}>
                <BurgerIngredients />
              </section>

              <section className={styles.section}>
                <BurgerConstructor onDropHandler={handleDrop} />
              </section>
            </BurgerIngredientsContext.Provider>
          </DndProvider>
        </main>
      </div>
    </div>
  );
}

export default App;
