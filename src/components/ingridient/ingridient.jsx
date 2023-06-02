import styles from '../ingridient/ingridient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import { useState } from 'react'
import { BurgerIngredientsContext } from '../../services/burgerContext'

function Ingredient({ data }) {

  const [visible, setVisible] = useState(false)

  const closeModal = () => {
    setVisible(false)
  }

  const modal = (
    <Modal onClose={closeModal}>
      <IngredientDetails data={data} />
    </Modal>
  )

  return (

    <div className={styles.ingridient}>
      <Counter count={1} size="default" extraClass="m-1" display="none" />
      <img className={styles.image} src={data.image} onClick={() => setVisible(true)} />

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
        {data.text}
      </p>

    </div>
  )
}


export default Ingredient