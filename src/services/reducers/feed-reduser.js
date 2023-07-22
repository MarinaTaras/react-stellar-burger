import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_CONNECTING,
  WS_OPEN,
  WS_CLOSE,
  WS_MESSAGE,
  WS_ERROR,
  WS_GET_ORDER,
  WS_SEND_ORDER,
  WS_USER_NAME_UPDATE
} from "../actions/feed-actions";

import { WebsocketStatus } from "../../utils/feed-status";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  connectingError: ''
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      };
    case WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: ''
      };
    case WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case WS_ERROR:
      return {
        ...state,
        connectingError: action.payload
      };
    case WS_GET_ORDER:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
      // case WS_MESSAGE:
      //   console.log('WS_MESSAGE', action.payload)
      //   return { ... state}
      //       // return {
      //       //     ...state,
      //       //     table: liveTableUpdate(state.table, action.payload),
      //       // }
    default:
      return state;
  }
}