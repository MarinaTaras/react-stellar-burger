import styles from '../ingridient/ingridient.module.css'
import { Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function Ingredient({price, img, text}) {
  return (

      <div className={styles.ingridient}>
        <Counter count={1} size="default" extraClass="m-1" display="none"/>
        <img className={styles.image} src={img}/>

        <div style={{ display: 'flex', padding: '4px 0', alignItems: 'center', gap: '9px'}}>
          <p style={{textAlign: 'center', alignItems: 'center'}} className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>

        <p className="text text_type_main-default" style={{textAlign: 'center', alignItems: 'center'}}>
          {text}
        </p>
                
      </div>
  )
}


export default Ingredient