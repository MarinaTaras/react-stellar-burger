import { useState } from "react"
import getIngredients from "../../utils/burger-api"
import getOrder from "../../utils/order-api"

import {
  GET_INGRIDIENTS_FAILED, GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_SUCCESS,
  POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS,
} from "./actions"

import { AppDispatch } from "../types";

// Типизация экшенов

export interface IGetIngridientsFailedAction {
  readonly type: typeof GET_INGRIDIENTS_FAILED;
}

export interface IGetIngridientsRequesrAction {
  readonly type: typeof GET_INGRIDIENTS_REQUEST;
}

export interface IGetIngridientsSuccessAction {
  readonly type: typeof GET_INGRIDIENTS_SUCCESS;
}

// Объединяем в Union
export type TGetIngridientsActions = 
| IGetIngridientsFailedAction
| IGetIngridientsRequesrAction
| IGetIngridientsSuccessAction;

export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface IPostOrderRequestAction {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
}

// Объединяем в Union
export type TPostOrderActions =
| IPostOrderFailedAction
| IPostOrderRequestAction
| IPostOrderSuccessAction;

export function ingredientsRequest() {
  return function (dispatch: AppDispatch) {
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

export function postOrderRequest(idArr: any) {

  return function (dispatch: AppDispatch) {
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