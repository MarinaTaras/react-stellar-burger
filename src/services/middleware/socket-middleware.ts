import { MiddlewareAPI, Middleware } from 'redux'
///import { getCookie } from "../../utils/get-cookie";
///import { wsConnect, wsDisconnect, TWsActions} from "../actions/feed-actions";
import { TWSMiddlewareActions } from '../types';

export const socketMiddleware = (wsUrl: string, wsActions: TWSMiddlewareActions, isAuth: boolean = false): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsDisconnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting
      } = wsActions;

      const accessToken = localStorage.getItem("accessToken")?.slice(7);
      

      if (type === wsConnect) {
        if (!isAuth) {
          socket = new WebSocket(wsUrl);
        } else {
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        }
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: 'Error' });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};

