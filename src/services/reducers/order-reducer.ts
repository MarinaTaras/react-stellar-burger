import { CALC_ORDER_PRICE, TOrderPriceActions } from "../actions/actions";
import { TIngredient, TOrderPriceState } from "../types";

//расчет стоимости заказа

const initialState: TOrderPriceState = 0


export const orderPriceReducer = (state = initialState, action: TOrderPriceActions): TOrderPriceState => {
  switch (action.type) {
    case CALC_ORDER_PRICE: {
      const totalPrice = action.data.reduce((acc: number, item: TIngredient) => acc + item.price, 0)
      return totalPrice  
    }

    default: {
      return state
    }
  }
}