import { TOrderInfo, TFeed } from '../types'

export const WS_AUTH_CONNECT: 'WS_AUTH_CONNECT' = 'WS_AUTH_CONNECT';
export const WS_AUTH_DISCONNECT: 'WS_AUTH_DISCONNECT' = 'WS_AUTH_DISCONNECT';
export const WS_AUTH_CONNECTING: 'WS_AUTH_CONNECTING' = 'WS_AUTH_CONNECTING';
export const WS_AUTH_OPEN: 'WS_AUTH_OPEN' = 'WS_AUTH_OPEN';
export const WS_AUTH_CLOSE: 'WS_AUTH_CLOSE' = 'WS_AUTH_CLOSE';
export const WS_AUTH_MESSAGE: 'WS_AUTH_MESSAGE' = 'WS_AUTH_MESSAGE';
export const WS_AUTH_ERROR: 'WS_AUTH_ERROR' = 'WS_AUTH_ERROR';
export const WS_AUTH_GET_ORDER: 'WS_AUTH_GET_ORDERS' = 'WS_AUTH_GET_ORDERS';
export const WS_AUTH_SEND_ORDER: 'WS_AUTH_SEND_ORDERS' = 'WS_AUTH_SEND_ORDERS';
export const WS_AUTH_USER_NAME_UPDATE: 'WS_AUTH_USER_NAME_UPDATE' = 'WS_AUTH_USER_NAME_UPDATE';

export interface IWsAuthConnect {
  readonly type: typeof WS_AUTH_CONNECT;
}

export interface IWsAuthDisconnect {
  readonly type: typeof WS_AUTH_DISCONNECT;
}

export interface IWsAuthConnecting {
  readonly type: typeof WS_AUTH_CONNECTING;
}

export interface IWsAuthOpen {
  readonly type: typeof WS_AUTH_OPEN;
}

export interface IWsAuthClose {
  readonly type: typeof WS_AUTH_CLOSE;
}

export interface IWsAuthMessage {
  readonly type: typeof WS_AUTH_MESSAGE;
}

export interface IWsAuthError {
  readonly type: typeof WS_AUTH_ERROR;
  payload: string
}

export interface IWsAuthGetOrder {
  readonly type: typeof WS_AUTH_GET_ORDER;
  payload: TFeed
}

export interface IWsAuthSendOrder {
  readonly type: typeof WS_AUTH_SEND_ORDER;
  payload: TFeed
}

export interface IWsAuthUserNameUpdate {
  readonly type: typeof WS_AUTH_USER_NAME_UPDATE;
}

// Объединяем в Union
export type TWsAuthActions = 
    | IWsAuthConnect
    | IWsAuthDisconnect
    | IWsAuthConnecting
    | IWsAuthOpen
    | IWsAuthClose
    | IWsAuthMessage
    | IWsAuthError
    | IWsAuthGetOrder
    | IWsAuthSendOrder
    | IWsAuthUserNameUpdate


export const authConnect = (url: string) =>  ({
    type: WS_AUTH_CONNECT
});

export const authDisconnect = () => ({
    type: WS_AUTH_DISCONNECT,
});


export const wsAuthOpen = () => {
	return {
		type: WS_AUTH_OPEN
	}
}

export const wsAuthError = (connectingError: string) => {
	return {
		type: WS_AUTH_ERROR,
    payload: connectingError
	};
};

export const wsAuthClosed = () => {
	return {
		type: WS_AUTH_CLOSE
	};
};

export const wsAuthGetOrder = (order: TFeed): IWsAuthGetOrder => {
	return {
		type: WS_AUTH_GET_ORDER,
		payload: order
	};
};

export const wsAuthSendOrder = (order: TFeed): IWsAuthSendOrder => {
	return {
		type: WS_AUTH_SEND_ORDER,
		payload: order
	};
};
