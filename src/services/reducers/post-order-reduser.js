
import { POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS } from "../actions/actions";
//import { state } from "../state"

const initialState = {
    postOrderNumber: null,
    postOrderRequest: false,
    postOrderFailed: false,
  }

export const postOrderRuduser = (state = initialState, action) => {
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