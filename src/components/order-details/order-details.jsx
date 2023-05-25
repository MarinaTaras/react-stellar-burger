import styles from "./order-details.module.css";
import { Icons, CheckMarkIcon, Typography } from "@ya.praktikum/react-developer-burger-ui-components"
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import done from "./../../images/done.png"

function OrderDetails() {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large mb-8">034526</p>
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