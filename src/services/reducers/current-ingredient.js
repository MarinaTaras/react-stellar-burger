import { GET_INGRIDIENT_INFO, CLEAR_INGRIDIENT_INFO } from "../actions/actions"
import { state } from "../state"

const initialState = state.currentIngredient

export const currentIngridientReducer = (state = initialState, action) => {
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
