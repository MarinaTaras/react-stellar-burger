import styles from '../ingridient/ingridient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { CLEAR_INGRIDIENT_INFO, ADD_CONSTRUCTOR_INGRIDIENT, GET_INGRIDIENT_INFO } from '../../services/actions/actions'
import { useDrag } from "react-dnd";

function Ingredient({ data }) {
  const store = useStore()
  const dispatch = useDispatch()
  const { item } = useSelector(state => state.currentIngredient);
  const [visible, setVisible] = useState(false)

  // реализация перетаскивания
  const [{isDrag}, dragRef] = useDrag({
        type: "ingredient",
        item: data,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });



  const closeModal = () => {
    const clearIngredientInfo = {
      type: CLEAR_INGRIDIENT_INFO
    }
    dispatch(clearIngredientInfo)
    setVisible(false)
  }

  const openModal = () => {
    const getIngredientInfo = {
      type: GET_INGRIDIENT_INFO,
      data
    }
    dispatch(getIngredientInfo)
    setVisible(true)
  }

  const modal = (
    <Modal onClose={closeModal}>
      <IngredientDetails data={item} />
    </Modal>
  )

  return (
    !isDrag && 
    <div className={styles.ingridient} ref={dragRef}>
      <Counter count={data.count || 0} size="default" extraClass="m-1" display="none" />
      <img className={styles.image} src={data.image} onClick={() => openModal()} />

      {visible && modal}

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
    </div>
  )
}


export default Ingredient