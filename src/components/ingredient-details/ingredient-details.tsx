import styles from './ingredient-details.module.css';
import { ingridientDetailsPropType } from '../../utils/prop-types';
import { TIngredient } from '../../services/types';

function IngredientDetails(props: {data: TIngredient}) {

  const {data} = props
  return (

    <div className={styles.container}>
      <p className={`${styles.title} text text_type_main-large`}>Детали ингридиента</p>
      <img className={styles.image} src={data.image_large} alt="ингридиент" />
      <p className={`${styles.discription} text text_type_main-medium`}>{data.name || ''}</p>
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