import { initStore } from "./store";
import { rootReducer } from './reducers';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

//типизация useDispatch
export type AppDispatch = typeof initStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

//типизация хранилища
export type RootState = ReturnType<typeof rootReducer>

//типизация useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type TState = {
  constructorIngredients: TIngredient[],
  orderPrice: TOrderPriceState,
  feedAuth: TWsFeedState,
  auth: TAuthState,
  feed: TFeed,
  ingredients: TIngredients,

  currentIngredient: {
    item: {
      calories: number
      carbohydrates: number
      fat: number
      image_large: string
      name: string
      proteins: number
      type: string
    }
  }

  orderNumber: {
    postOrderNumber: number,
    postOrderRequest: boolean,
    postOrderFailed: boolean
  }
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
export type TOrderPriceState = number


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

export type TResponse = {
  success: boolean;
  message?: string;
  headers?: Headers;
  refreshToken: string;
  accessToken: string;
  postToken: string
};

// logout-api
export type THeaders = {
  authorization: string | null;
  "Content-Type": string;
}

export type TRegisterProps = {
  email: string,
  password: string,
  name: string
}

export type TLogout = {
  message: string;
  success: boolean;
  refreshToken: string;
}

export type TAuthResponse = {
  success: boolean,
  user?: {
    email: string,
    name: string
  }
}

export type TIngredientId = string