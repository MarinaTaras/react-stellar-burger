import { log } from "console";
import { CHANGE_COUNT, GET_INGRIDIENTS_FAILED, GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_SUCCESS, TGetIngridientsActions} from "../actions/actions"
import { IReducersState } from "../types";


const initialState: IReducersState = { 
  items: [], 
  loading: false, 
  errors: '' }

export const ingridientReducer = (state = initialState, action: TGetIngridientsActions) => {
  switch (action.type) {
    case GET_INGRIDIENTS_REQUEST: {
        return { ...state, loading: true, errors: '' };
    }
    case GET_INGRIDIENTS_SUCCESS: {
      return { ...state, items: action.data, loading: false };
    }
    case GET_INGRIDIENTS_FAILED: {
      return { ...state, loading: false, errors: 'Что-то пошло не так...'  }
    }
    case CHANGE_COUNT: {
      const amount = action.data
      const items = state.items.map((item) => {
        const id = item._id 
        const count = amount[id] || 0
        item.count = count
        return item
      })

      
      return { ...state, items }
    }


        default: {
      return state
    }
  }
}

