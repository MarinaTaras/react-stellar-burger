import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { ReactNode } from 'react';

import { initStore } from "./store";
import { rootReducer } from './reducers';
import { useDispatch } from 'react-redux';

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof initStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type TState = {
  constructorIngredients: TIngredient[],
  orderPrice: TOrderPriceState,
  feedAuth: TWsFeedState,
  auth: TAuthState,
  feed: TFeed,
  ingredients: TIngredients,

  currentIngredient: any,
  orderNumber: any,
}

export type TIngredient = {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce" | '';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  count?: number | null;
  id?: string;
  uuid?: string;
  dragIndex: number;
  hoverIndex: number;
  key: string
}

export type TUser = {
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number | null;
  owner: TUser | null;
  price: number | null;
}

export type TOrderInfo = {
  name: string
  order: TOrder;
  success: boolean;
}

export type TFeed = {
  status: string;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  connectingError: string
}

type TIngredients = {
  items: TIngredient[],
  errors: string,
  loading: boolean
}


// state in feed-reduser & feed_auth-reduser
export type TWsFeedState = {
  status: string
  orders: TOrder[],
  total: number;
  totalToday: number;
  connectingError: string;
}

// state in auth-reduser
export type TAuthState = {
  user: TUser | null,
  isAuthChecked: boolean,
  loading: boolean,
  errors: string
}


// state in current-ingredient

export type TCurrentIngredientState = {
  item: {
    name: string,
    calories: number,
    proteins: number,
    fat: number,
    carbohydrates: number,
    image_large: string,
    type: string,
  }
}

// state in order-reducer
export type TOrderPriceState = {
  orderPrice: number
}

// state in post-order-reduser
export type TPostOrderState = {
  postOrderNumber: number,
  postOrderRequest: boolean,
  postOrderFailed: boolean,
}

// state in reducers
export type IReducersState = {
  items: TIngredient[],
  loading: boolean,
  errors: string
}

// store Middleware
export type TFeedMiddlewareActions = {
  wsConnect: string,
  wsDisconnect: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string
};

// socket-middleware
export type TWSMiddlewareActions = {
  wsConnect: string,
  wsDisconnect: string,
  wsSendMessage: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string,
  wsConnecting: string
}

// ingredientdetails-page
export type TIngredientDetails = {
  name: string,
  calories: number,
  proteins: number,
  fat: number,
  carbohydrates: number,
  image_large: string,
  type: string,
}

