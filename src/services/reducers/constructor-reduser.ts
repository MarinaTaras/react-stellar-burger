import {
  ADD_CONSTRUCTOR_INGRIDIENT,
  REMOVE_INGRIDIENT, SORT_ITEMS, TConstructorActions
} from "../actions/actions"
import { state } from "../state.js"

import { TIngredient } from "../types";

const initialState: any = [];

export const ingridientConstructorReducer =
  (state = initialState, action: TConstructorActions) => {
    switch (action.type) {
      case ADD_CONSTRUCTOR_INGRIDIENT: {

        const item = action.data

        if (action.data.type === 'bun') {
          let ingred = [...state]
          ingred = ingred.filter(item => item.type !== 'bun')
          return [...ingred, item, item];
        }
        return [...state, { ...item }];
      }

      case REMOVE_INGRIDIENT: {
        const ingredients = state.filter((item: { uuid: string | undefined; }) => item.uuid !== action.data.uuid);
        return ingredients
      }

      case SORT_ITEMS: {

        const sortedArray = [...state];
        const dragIndex = action.data.dragIndex;
        const hoverIndex = action.data.hoverIndex;

        const dragItem = sortedArray.splice(hoverIndex, 1, sortedArray[dragIndex]);
        sortedArray.splice(dragIndex, 1, dragItem[0]);

        return sortedArray
      }


      default: {
        return state
      }
    }
  }