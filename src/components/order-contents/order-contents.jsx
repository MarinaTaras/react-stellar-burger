
import { useDispatch, useSelector } from 'react-redux'

import styles from './order-contents.module.css'

import sauce_with_spikes from '../../images/sauce_with_spikes.png'
import { CurrencyIcon, FormattedDate, Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingridientReducer } from '../../services/reducers/reducers'
import { rootReducer } from '../../services/reducers'
import { useEffect } from 'react'
import { ingredientsRequest } from '../../services/actions/api-actions'


function OrderContents({ order, status }) {
  const dispatch = useDispatch()
  let orderDate = order.createdAt
  let orderIngredients = order.ingredients
  let orderlength = orderIngredients.length
  let orderPrice = 0

  useEffect(() => {
    dispatch(ingredientsRequest())
  }, [])

  //для поиска картинок ингредиентов находим все ингредиенты
  const { items, loading, errors } = useSelector(state => state.ingredients)

  const getIngredients = () => {

    return orderIngredients &&
      orderlength <= 5 &&
      orderIngredients.map((ingredient, index) => {
        const item = items && items.find((item) => item._id === ingredient)

        if (item) {
          orderPrice += item.price
          return (
            <li className={styles.ingredient} key={index}>
              <img className={styles.ingredient_image} src={item.image} alt="ingredient" />
            </li>
          )
        }

      })

  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} >
        <div className={styles.order_info}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(orderDate)} />
        </div>
        <div className={styles.order_name}>
          <h2 className={`${styles.text} text text_type_main-medium `}>{order.name}</h2>
          <p className={`${styles.order_status} text text_type_main-default`}>{order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : 'Выполнен'}</p> {/* {!!status && p}   {status === 'done' ? 'Выполнен' : status === 'pending' ? 'Готовится' : status === 'created' ? 'Создан' : 'Выполнен'} */}
        </div>
        <div className={styles.order_ingredients}>
          <ul className={styles.ingredients}>
            {getIngredients()}
          </ul>
          <div className={styles.price}>
            <p className='text text_type_digits-default pr-2'>{orderPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default OrderContents