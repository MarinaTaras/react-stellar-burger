
export const WS_CONNECT = 'WS_CONNECT';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_CONNECTING = 'WS_CONNECTING';
export const WS_OPEN = 'WS_OPEN';
export const WS_CLOSE = 'WS_CLOSE';
export const WS_MESSAGE = 'WS_MESSAGE';
export const WS_ERROR = 'WS_ERROR';
export const WS_GET_ORDER = 'WS_GET_ORDER';
export const WS_SEND_ORDER = 'WS_SEND_ORDER';
export const WS_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE';

// connect и disconnect идут в middleware
export const wsConnect = (url) => ({
    type: WS_CONNECT,
    payload: url
});

export const wsDisconnect = () => ({
    type: WS_DISCONNECT,
});


// эти экшены middleware посылает нам в хранилище
export const wsOpen = () => {
	return {
		type: WS_OPEN
	}
}

export const wsError = () => {
	return {
		type: WS_ERROR
	};
};

export const wsClose = () => {
	return {
		type: WS_CLOSE
	};
};

export const wsGetOrder = order => {
	return {
		type: WS_GET_ORDER,
		payload: order
	};
};

export const wsSendOrder = order => {
	return {
		type: WS_SEND_ORDER,
		payload: order
	};
};



