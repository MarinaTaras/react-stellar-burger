import { useState } from "react"
import getIngredients from "../../utils/burger-api"
import getOrder from "../../utils/order-api"

import {
  GET_INGRIDIENTS_FAILED, GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_SUCCESS,
  POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS,
} from "./actions"

export function ingredientsRequest() {
  return function (dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST
    })
    // Запрашиваем данные у сервера

    getIngredients()
      .then((result) => {
        if (result && result.success) {
          const data = result.data
          dispatch({ type: GET_INGRIDIENTS_SUCCESS, data })
        }
        else {
          dispatch({
            type: GET_INGRIDIENTS_FAILED
          })
        }
      })
      .catch(e => dispatch({ type: GET_INGRIDIENTS_FAILED }))

  }
}

export function postOrderRequest(idArr) {

  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    })
    // Запрашиваем данные у сервера
    getOrder(idArr)
      .then((result) => {
        if (result && result.success) {
          const orderNumber = result.order.number
          dispatch({
            type: POST_ORDER_SUCCESS,
            orderNumber
          })
        }
        else {
          dispatch({
            type: POST_ORDER_FAILED
          })
        }
      })
      .catch(e => dispatch({ type: POST_ORDER_FAILED }))

  }
} 