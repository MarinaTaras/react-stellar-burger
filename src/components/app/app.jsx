import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useState } from "react";
import getIngredients from "../../utils/burger-api";

function App() {
  const [data, setData] = useState([])

  // запрос к Api при монтировании App
  useEffect(() => {
    getIngredients()
      .then((result) => setData(result.data))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.main}>
          <section className={styles.section}>
            <BurgerIngredients data={data} />
          </section>

          <section className={styles.section}>
            <BurgerConstructor data={data} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
