import styles from "./order-details.module.css";
import done from "./../../images/done.png"
import { BurgerOrderContext } from "../../services/burgerContext";
import { useContext } from "react";


function OrderDetails() {
const burgerOrder = useContext(BurgerOrderContext)

  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large mb-8">{burgerOrder}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={styles.check}>
        <img src={done} alt="done" className={styles.icon}/>
      </div>
      <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитель готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails