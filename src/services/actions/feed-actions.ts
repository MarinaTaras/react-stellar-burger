import { TFeed, TOrderInfo } from '../types'

export const WS_CONNECT: 'WS_CONNECT' = 'WS_CONNECT';
export const WS_DISCONNECT: 'WS_DISCONNECT' = 'WS_DISCONNECT';
export const WS_CONNECTING: 'WS_CONNECTING' = 'WS_CONNECTING';
export const WS_OPEN: 'WS_OPEN' = 'WS_OPEN';
export const WS_CLOSE: 'WS_CLOSE' = 'WS_CLOSE';
export const WS_MESSAGE: 'WS_MESSAGE' = 'WS_MESSAGE';
export const WS_ERROR: 'WS_ERROR' = 'WS_ERROR';
export const WS_GET_ORDER: 'WS_GET_ORDER' = 'WS_GET_ORDER';
export const WS_SEND_ORDER: 'WS_SEND_ORDER' = 'WS_SEND_ORDER';
export const WS_USER_NAME_UPDATE: 'WS_USER_NAME_UPDATE' = 'WS_USER_NAME_UPDATE';

export interface IWsConnect {
  readonly type: typeof WS_CONNECT;
}

export interface IWsDisconnect {
  readonly type: typeof WS_DISCONNECT;
}

export interface IWsConnecting {
  readonly type: typeof WS_CONNECTING;
}

export interface IWsOpen {
  readonly type: typeof WS_OPEN;
}

export interface IWsClose {
  readonly type: typeof WS_CLOSE;
}

export interface IWsMessage {
  readonly type: typeof WS_MESSAGE;
}

export interface IWsError {
  readonly type: typeof WS_ERROR
  payload: string
}

export interface IWsGetOrder {
  readonly type: typeof WS_GET_ORDER;
  payload: TFeed
}

export interface IWsSendOrder {
  readonly type: typeof WS_SEND_ORDER;
  payload: TFeed
}

export interface IWsUserNameUpdate {
  readonly type: typeof WS_USER_NAME_UPDATE;
}

// Объединяем в Union
export type TWsActions = 
    | IWsConnect
    | IWsDisconnect
    | IWsConnecting
    | IWsOpen
    | IWsClose
    | IWsMessage
    | IWsError
    | IWsGetOrder
    | IWsSendOrder
    | IWsUserNameUpdate

// connect и disconnect идут в middleware
export const wsConnect = (url: string): IWsConnect => ({
    type: WS_CONNECT,
    //payload: url
});

export const wsDisconnect = (): IWsDisconnect => ({
    type: WS_DISCONNECT,
});


// эти экшены middleware посылает нам в хранилище
export const wsOpen = (): IWsOpen => {
	return {
		type: WS_OPEN
	}
}

export const wsError = (connectingError: string): IWsError => {
	return {
		type: WS_ERROR,
    payload: connectingError
	};
};

export const wsClose = (): IWsClose => {
	return {
		type: WS_CLOSE
	};
};

export const wsGetOrder = (order: TFeed): IWsGetOrder => {
	return {
		type: WS_GET_ORDER,
		payload: order
	};
};

export const wsSendOrder = (order: TFeed): IWsSendOrder => {
	return {
		type: WS_SEND_ORDER,
		payload: order
	};
};



