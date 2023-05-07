
import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";




function App() {
  return (
    <div className={styles.app}>
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.main}>
          <section className={styles.section}>
            <BurgerIngredients />
          </section>
          <section className={styles.section}>
            <BurgerConstructor />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
