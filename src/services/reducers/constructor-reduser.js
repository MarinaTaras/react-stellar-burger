import { ADD_CONSTRUCTOR_INGRIDIENT, REMOVE_INGRIDIENT, SORT_ITEMS } from "../actions/actions"
import { state } from "../state"
import { v4 as uuidv4 } from "uuid"

const initialState = state.constructorIngredients;

export const ingridientConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONSTRUCTOR_INGRIDIENT: {

      const item = action.data
      item.uuid = uuidv4()

      if (action.data.type === 'bun') {
        let ingred = [...state]
        ingred = ingred.filter(item => item.type !== 'bun')
        return [...ingred, item, item];
      }
      return [...state, { ...item }];
    }

    case REMOVE_INGRIDIENT: {
      const ingredients = state.filter(item => item.uuid !== action.data.uuid);
      return ingredients
    }

    case SORT_ITEMS: {

      const sortedArray = [...state];
      const dragIndex = action.data.dragIndex
      const hoverIndex = action.data.hoverIndex

      const dragItem = sortedArray.splice(hoverIndex, 1, sortedArray[dragIndex]);
      sortedArray.splice(dragIndex, 1, dragItem[0]);

      return sortedArray
    }


    default: {
      return state
    }
  }
}