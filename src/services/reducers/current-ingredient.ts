import { GET_INGRIDIENT_INFO, CLEAR_INGRIDIENT_INFO, TIngridientActions } from "../actions/actions"
import { TCurrentIngredientState } from "../types";

const initialState = {
    item: {
      name: '',
      calories: 0,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      image_large: '',
      type: '',
    }
  }

export const currentIngridientReducer = (state = initialState, action: TIngridientActions): TCurrentIngredientState => {
  switch (action.type) {
    case GET_INGRIDIENT_INFO: {
        return { ...state, item: action.data };
    }
    case CLEAR_INGRIDIENT_INFO: {
      return { ...initialState };
    }
    
        default: {
      return state
    }
  }
}
