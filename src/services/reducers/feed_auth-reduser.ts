import {
  WS_AUTH_CONNECT,
  WS_AUTH_DISCONNECT,
  WS_AUTH_CONNECTING,
  WS_AUTH_OPEN,
  WS_AUTH_CLOSE,
  WS_AUTH_MESSAGE,
  WS_AUTH_ERROR,
  WS_AUTH_GET_ORDER,
  WS_AUTH_SEND_ORDER,
  WS_AUTH_USER_NAME_UPDATE
} from "../actions/feed_auth-actions";

import { WebsocketStatus } from "../../utils/feed-status";

import { TWsAuthActions } from '../actions/feed_auth-actions';
import { TWsFeedState } from '../types'


const initialFeedAuthState: TWsFeedState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  connectingError: ''
};

export const feedAuthReducer = (state = initialFeedAuthState, action: TWsAuthActions): TWsFeedState => {
  switch (action.type) {
    case WS_AUTH_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      };
    case WS_AUTH_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: ''
      };
    case WS_AUTH_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case WS_AUTH_ERROR:
      return {
        ...state,
        connectingError: action.payload
      };
    case WS_AUTH_GET_ORDER:
      return {
        ...state,
        orders: action.payload.orders.reverse(),
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }
    default:
      return state;
  }
}