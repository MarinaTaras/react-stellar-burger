import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useState } from "react";
import Modal from "../modal/modal";

const HTTP = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
  const [data, setData] = useState([])

  // запрос к Api при монтировании App
  useEffect(() => {
    fetch(HTTP)
      .then((res) => res.json())
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
