import { type } from 'os';
import { TIngredient } from '../types'

// экшены получения данных
export const GET_INGRIDIENTS_REQUEST: 'GET_INGRIDIENTS_REQUEST' = 'GET_INGRIDIENTS_REQUEST'
export const GET_INGRIDIENTS_SUCCESS: 'GET_INGRIDIENTS_SUCCESS' = 'GET_INGRIDIENTS_SUCCESS';
export const GET_INGRIDIENTS_FAILED: 'GET_INGRIDIENTS_FAILED' = 'GET_INGRIDIENTS_FAILED';
// смена счетчика
export const CHANGE_COUNT: 'CHANGE_COUNT' = 'CHANGE_COUNT'

// экшены отправки заказа
export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';

// экшены данных об ингредиенте
export const GET_INGRIDIENT_INFO: 'GET_INGRIDIENT_INFO' = 'GET_INGRIDIENT_INFO';
export const CLEAR_INGRIDIENT_INFO: 'CLEAR_INGRIDIENT_INFO' = 'CLEAR_INGRIDIENT_INFO';

//экшены расчета стоимости заказа
export const CALC_ORDER_PRICE: 'CALC_ORDER_PRICE' = 'CALC_ORDER_PRICE'

//конструктор
export const ADD_CONSTRUCTOR_INGRIDIENT: 'ADD_CONSTRUCTOR_INGRIDIENT' = 'ADD_CONSTRUCTOR_INGRIDIENT';
export const REMOVE_INGRIDIENT: 'REMOVE_INGRIDIENT' = 'REMOVE_INGRIDIENT'
export const SORT_ITEMS: 'SORT_ITEMS' = 'SORT_ITEMS'

// Типизация экшенов

export interface IGetIngridientsRequestAction {
  readonly type: typeof GET_INGRIDIENTS_REQUEST;
}

export interface IGetIngridientsSuccessAction {
  readonly type: typeof GET_INGRIDIENTS_SUCCESS;
}

export interface IGetIngridientsFailedAction {
  readonly type: typeof GET_INGRIDIENTS_FAILED;
}

////

export interface IAddConstructorIngridientAction {
  readonly type: typeof ADD_CONSTRUCTOR_INGRIDIENT;
  readonly data: TIngredient
}

export interface IRemoveIngridientAction {
  readonly type: typeof REMOVE_INGRIDIENT;
  readonly data: TIngredient;
  readonly uuid: string;
  item: TIngredient;
}

export interface ISortItemsAction {
  readonly type: typeof SORT_ITEMS;
  readonly data: TIngredient;
}

///

export interface IGetIngridientInfoAction {
  readonly type: typeof GET_INGRIDIENT_INFO;
  readonly data: TIngredient;
}

export interface IClearIngridientInfoAction {
  readonly type: typeof CLEAR_INGRIDIENT_INFO;
}

export interface ICalcOrderPriceAction {
  readonly type: typeof CALC_ORDER_PRICE;
  readonly data: TIngredient[];
}

///

export interface IPostOrderRequestAction {
  readonly type: typeof POST_ORDER_REQUEST
}

export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly orderNumber: number
}

export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED
}

///

export interface IGetIngridientsRequestAction {
  readonly type: typeof GET_INGRIDIENTS_REQUEST
}

export interface IGetIngridientsSuccessAction {
  readonly type: typeof GET_INGRIDIENTS_SUCCESS
  readonly data: TIngredient[]
}

export interface IGetIngridientsFailedAction {
  readonly type: typeof GET_INGRIDIENTS_FAILED
}

export interface IChangeCountAction {
  readonly type: typeof CHANGE_COUNT
  readonly data: { [id: string]: number }
}

// Объединяем в Union
export type TIGetIngridientsActions =
  | IGetIngridientsRequestAction
  | IGetIngridientsSuccessAction
  | IGetIngridientsFailedAction

/////

export type TConstructorActions =
  | IAddConstructorIngridientAction
  | IRemoveIngridientAction
  | ISortItemsAction

//// 

export type TIngridientActions =
  | IGetIngridientInfoAction
  | IClearIngridientInfoAction

////

export type TOrderPriceActions =
  | ICalcOrderPriceAction

////

export type TPostOrderActions =
  | IPostOrderRequestAction
  | IPostOrderSuccessAction
  | IPostOrderFailedAction

////

export type TGetIngridientsActions =
  | IGetIngridientsRequestAction
  | IGetIngridientsSuccessAction
  | IGetIngridientsFailedAction
  | IChangeCountAction