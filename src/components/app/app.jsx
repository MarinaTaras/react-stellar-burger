import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useReducer } from "react";
import getIngredients from "../../utils/burger-api";
import { BurgerIngredientsContext } from "../../services/burgerContext";


function App() {
  //получаем содержимое контекста
  const initialState = { items: [], total: 0 }
  //const [data, setData] = useState({items: [], total: 10})
  const [state, dispatch] = useReducer(reducer, initialState);

  // запрос к Api при монтировании App
  useEffect(() => {
    getIngredients()
      .then((result) => {
        const data = result.data
        dispatch({ type: 'initial', data })
      })
      .catch(e => console.log(e))
  }, [])
  
  // расчет стоимости заказа
  function reducer(state, action) {

    switch (action.type) {
      case "initial":
        let total = state.total
        action.data.forEach(item => {
          total += item.price
        })

        return { ...state, items: action.data, total };

      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }

  }

  return (
    <div className={styles.app}>
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredientsContext.Provider value={state}>
            <section className={styles.section}>
              <BurgerIngredients />
            </section>

            <section className={styles.section}>
              <BurgerConstructor />
            </section>
          </BurgerIngredientsContext.Provider>
        </main>
      </div>
    </div>
  );
}

export default App;
