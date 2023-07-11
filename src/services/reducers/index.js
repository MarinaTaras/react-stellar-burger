import { combineReducers } from 'redux';
import { ingridientReducer } from './reducers'
import { currentIngridientReducer } from './current-ingredient';
import { ingridientConstructorReducer } from './constructor-reduser';
import { orderPriceReducer } from './order-reducer';
import { postOrderRuduser } from './post-order-reduser';
import { authReducer } from './auth-reduser';

//создаем rootReducer
export const rootReducer = combineReducers ({
  ingredients: ingridientReducer,
  constructorIngredients: ingridientConstructorReducer,
  currentIngredient: currentIngridientReducer,
  orderPrice: orderPriceReducer,
  orderNumber: postOrderRuduser,
  authReducer: authReducer
})