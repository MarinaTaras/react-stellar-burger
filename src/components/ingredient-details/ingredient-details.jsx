import styles from './ingredient-details.module.css';
import { ConstructorElement, Typography } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { ingridientDetailsPropType } from '../../utils/prop-types';

function IngredientDetails({ data }) {
  return (

    <div className={styles.container}>
      <p className={`${styles.title} text text_type_main-large`}>Детали ингридиента</p>
      <img className={styles.image} src={data.image_large} alt="ингридиент" />
      <p className={`${styles.discription} text text_type_main-medium`}>{data.name}</p>
      <ul className={styles.info}>
        <li className={styles.value}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
        </li>
        <li className={styles.value}>
          <p className="text text_type_main-default text_color_inactive">
            Белки,г
          </p>
          <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
        </li>
        <li className={styles.value}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры,г
          </p>
          <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
        </li>
        <li className={styles.value}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы,г
          </p>
          <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  data: ingridientDetailsPropType.isRequired,
};

export default IngredientDetails