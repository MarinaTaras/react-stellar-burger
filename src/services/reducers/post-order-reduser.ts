
import { POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS, TPostOrderActions } from "../actions/actions";
import { TPostOrderState } from "../types";


const initialState = {
  postOrderNumber: 0,
  postOrderRequest: false,
  postOrderFailed: false,
}

export const postOrderRuduser = (state = initialState, action: TPostOrderActions): TPostOrderState => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        postOrderRequest: true
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        postOrderRequest: false,
        postOrderFailed: false,
        postOrderNumber: action.orderNumber,
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        postOrderRequest: false,
        postOrderFailed: true,
      };
    }

    default: {
      return state
    }
  }
}