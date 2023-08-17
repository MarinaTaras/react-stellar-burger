import React, { useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingredient from "../ingridient/ingridient";
import { useInView } from 'react-intersection-observer';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { TIngredient, TState } from "../../services/types";

enum INGR {
  BUN = 'bun',
  SAUCE = 'sauce',
  MAIN = 'main',
  BUNS = 'buns',
  SAUCES = 'sauces',
  FILLINGS = 'fillings'
}

function BurgerIngredients() {
  const location = useLocation();
  const { items } = useSelector((state: TState) => state.ingredients)

  //булки из data.js
  const buns = items.filter(item => item.type === INGR.BUN);

  //соусы из data.js
  const sauces = items.filter(item => item.type === INGR.SAUCE);

  //начинки из data.js
  const fillings = items.filter(item => item.type === INGR.MAIN);
  const [current, setCurrent] = React.useState(INGR.BUNS);

  const [bunsRef, bunsInView] = useInView({
    threshold: 0.25
  });
  const [saucesRef, saucesInView] = useInView({
    threshold: 0.5
  });
  const [fillingsRef, fillingsInView] = useInView({
    threshold: 0.25
  });

  const onTabScroll = (type: INGR) => setCurrent(type)


  const handleIngredientScroll = () => {
    switch (true) {
      case bunsInView:
        setCurrent(INGR.BUNS);
        break;
      case saucesInView:
        setCurrent(INGR.SAUCES);
        break;
      case fillingsInView:
        setCurrent(INGR.FILLINGS);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleIngredientScroll();
  }, [bunsInView, saucesInView, fillingsInView]);



  const ingridientList = (items: TIngredient[]) => {
    return (
      <>
        {items.map(item => <Ingredient data={item} key={item._id}/> )}
      </>
    )
  }

  return (
    <>
      <div >
        <p className={`text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </p>
        <div className={`${styles.main_menu} mb-10`}>
          <Tab value={INGR.BUNS} active={current === INGR.BUNS} onClick={() => onTabScroll(INGR.BUNS)}>
            Булки
          </Tab>
          <Tab value={INGR.SAUCES} active={current === INGR.SAUCES} onClick={() => onTabScroll(INGR.SAUCES)}>
            Соусы
          </Tab>
          <Tab value={INGR.FILLINGS} active={current === INGR.FILLINGS} onClick={() => onTabScroll(INGR.FILLINGS)}>
            Начинки
          </Tab>
        </div>
        <div className='custom-scroll' style={{ overflow: 'auto', maxHeight: '756px' }}>
          <p className="text text_type_main-medium">
            Булки
          </p>

          <div className={`${styles.ingridients} mt-6 mb-10`} ref={bunsRef}>
            {ingridientList(buns)}
          </div>

          <p className="text text_type_main-medium">
            Соусы
          </p>

          <div className={`${styles.ingridients} mt-6 mb-2`} ref={saucesRef}>
            {ingridientList(sauces)}
          </div>

          <p className="text text_type_main-medium">
            Начинки
          </p>

          <div className={`${styles.ingridients} mt-6 mb-2`} ref={fillingsRef}>
            {ingridientList(fillings)}
          </div>
        </div>
      </div>

    </>

  )
}

export default BurgerIngredients

