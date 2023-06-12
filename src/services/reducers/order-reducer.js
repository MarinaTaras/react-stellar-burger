import { CALC_ORDER_PRICE } from "../actions/actions";
//import { state } from "../state"

//расчет стоимости заказа

const initialState = null;

export const orderPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALC_ORDER_PRICE: {
      const totalPrice = action.data.reduce((acc, item) => acc + item.price, 0)
      return totalPrice
    }

    default: {
      return state
    }
  }
}