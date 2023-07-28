export const WS_AUTH_CONNECT = 'WS_AUTH_CONNECT';
export const WS_AUTH_DISCONNECT = 'WS_AUTH_DISCONNECT';
export const WS_AUTH_CONNECTING = 'WS_AUTH_CONNECTING';
export const WS_AUTH_OPEN = 'WS_AUTH_OPEN';
export const WS_AUTH_CLOSE = 'WS_AUTH_CLOSE';
export const WS_AUTH_MESSAGE = 'WS_AUTH_MESSAGE';
export const WS_AUTH_ERROR = 'WS_AUTH_ERROR';
export const WS_AUTH_GET_ORDER = 'WS_AUTH_GET_ORDERS';
export const WS_AUTH_SEND_ORDER = 'WS_AUTH_SEND_ORDERS';
export const WS_AUTH_USER_NAME_UPDATE = 'WS_AUTH_USER_NAME_UPDATE';

export const authConnect = (url) =>  ({
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

export const wsAuthError = () => {
	return {
		type: WS_AUTH_ERROR
	};
};

export const wsAuthClosed = () => {
	return {
		type: WS_AUTH_CLOSE
	};
};

export const wsAuthGetOrder = order => {
	return {
		type: WS_AUTH_GET_ORDER,
		payload: order
	};
};

export const wsAuthSendOrder = order => {
	return {
		type: WS_AUTH_SEND_ORDER,
		payload: order
	};
};
