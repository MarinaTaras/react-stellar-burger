import styles from '../ingridient/ingridient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom'
import { TIngredient } from '../../services/types';

function Ingredient(props: { data: TIngredient }) {
  const { data } = props
  const location = useLocation();
  
  // реализация перетаскивания
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const ingredientId = data['_id']

  return (
    
      !isDrag &&
      <div className={styles.ingridient} ref={dragRef}>

        <Counter count={data.count || 0} size="default" extraClass="m-1" />

        <Link
          // Тут мы формируем динамический путь для нашего ингредиента
          to={`/ingredients/${ingredientId}`}
          // а также сохраняем в свойство background роут,
          // на котором была открыта наша модалка
          state={{ background: location }}
          className={styles.link}
        >
          <img className={styles.image} src={data.image} />
        </Link>

        <div style={{ display: 'flex', padding: '4px 0', alignItems: 'center', gap: '9px' }}>
          <p style={{ textAlign: 'center', alignItems: 'center' }}
            className="text text_type_digits-default">
            {data.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>

        <p className="text text_type_main-default"
          style={{ textAlign: 'center', alignItems: 'center' }}>
          {data.name}
        </p>
      </div> || <></>
  )
}


export default Ingredient