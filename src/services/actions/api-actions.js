import getIngredients from "../../utils/burger-api"
import { GET_INGRIDIENTS_FAILED, GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_SUCCESS } from "./actions"

export function ingredientsRequest() {
  return function (dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST
    })
    // Запрашиваем данные у сервера

    getIngredients()
      .then((result) => {
        const data = result.data
        dispatch({ type: GET_INGRIDIENTS_SUCCESS, data })
        //setIngredients(store.getState().ingredients.items)
      })
      .catch(e => dispatch({ type: GET_INGRIDIENTS_FAILED }))

  }
} 