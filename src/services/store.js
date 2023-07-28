import React from 'react';
import { configureStore } from "@reduxjs/toolkit";
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import thunkMiddleware from 'redux-thunk';

import thunk from 'redux-thunk';
import { rootReducer } from './reducers/index'
import { socketMiddleware } from './middleware/socket-middleware';

import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_OPEN,
  WS_CLOSE,
  WS_ERROR,
  WS_MESSAGE,
  WS_GET_ORDER,
  WS_SEND_ORDER
} from './actions/feed-actions';

import {
  WS_AUTH_CONNECT,
  WS_AUTH_DISCONNECT,
  WS_AUTH_OPEN,
  WS_AUTH_CLOSE,
  WS_AUTH_ERROR,
  WS_AUTH_MESSAGE,
  WS_AUTH_GET_ORDER,
  WS_AUTH_SEND_ORDER
} from './actions/feed_auth-actions'

export const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
export const wsAuthUrl = 'wss://norma.nomoreparties.space/orders';

const feedMiddleware = ({
  wsConnect: WS_CONNECT,
  wsDisconnect: WS_DISCONNECT,
  onOpen: WS_OPEN,
  onClose: WS_CLOSE,
  onError: WS_ERROR,
  onMessage: WS_GET_ORDER
});

const feedAuthMiddleware = ({
  wsConnect: WS_AUTH_CONNECT,
  wsDisconnect: WS_AUTH_DISCONNECT,
  onOpen: WS_AUTH_OPEN,
  onClose: WS_AUTH_CLOSE,
  onError: WS_AUTH_ERROR,
  onMessage: WS_AUTH_GET_ORDER
});


// export const initStore = configureStore({
//   reducer: {
//     rootReducer: rootReducer,
//   },
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(feedMiddleware, feedAuthMiddleware);
//   },
// }

// );

//подключаем redux-devtools
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware(wsUrl, feedMiddleware, false)),
		applyMiddleware(socketMiddleware(wsAuthUrl, feedAuthMiddleware, true)));
// создаем хранилище
export const initStore = createStore(rootReducer, enhancer);