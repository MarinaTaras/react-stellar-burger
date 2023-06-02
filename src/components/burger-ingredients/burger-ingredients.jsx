import React, { useContext } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingredient from "../ingridient/ingridient";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { BurgerIngredientsContext } from "../../services/burgerContext";


function BurgerIngredients() {
  const data = useContext(BurgerIngredientsContext)
  const [current, setCurrent] = React.useState(['buns']);
  const {items} = data
  
  //булки из data.js
  const buns = items.filter(item => item.type === "bun");

  //соусы из data.js
  const sauces = items.filter(item => item.type === "sauce");

  //начинки из data.js
  const fillings = items.filter(item => item.type === "main");

  const ingridientList = (items) => {
    return (
      <>
        {items.map((item) => {
          return (
            <Ingredient data={item} key={item._id} />
          )
        })}
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
          <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className='custom-scroll' style={{ overflow: 'auto', maxHeight: '756px' }}>
          <p className="text text_type_main-medium">
            Булки
          </p>

          <div className={`${styles.ingridients} mt-6 mb-10`}>
            {ingridientList(buns)}
          </div>

          <p className="text text_type_main-medium">
            Соусы
          </p>

          <div className={`${styles.ingridients} mt-6 mb-2`}>
            {ingridientList(sauces)}
          </div>

          <p className="text text_type_main-medium">
            Начинки
          </p>

          <div className={`${styles.ingridients} mt-6 mb-2`}>
            {ingridientList(fillings)}
          </div>
        </div>
      </div>

    </>

  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType)
}

export default BurgerIngredients

