import {
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILED,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILED,
  POST_TOKEN_REQUEST,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_FAILED,
  SET_USER,
  SET_AUTH_CHECKED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED
} from "../actions/auth-actions";


const initialState = { user: null, isAuthChecked: false, loading: false, errors: false }

export const authReducer = (state = initialState, action) => {

  console.log('Action', action, state)
  switch (action.type) {
    case POST_REGISTER_REQUEST: {
      return { ...state, loading: true, errors: null };
    }
    case POST_REGISTER_SUCCESS: {
      console.log('data', action.data)
      const name = action.data.user.name
      const email = action.data.user.email
      return { ...state, user: { name, email }, isAuthChecked: true }
    }
    case POST_REGISTER_FAILED: {
      return { ...state, loading: false, errors: 'Что-то пошло не так...' };
    }
    case POST_LOGIN_REQUEST: {
      return { ...state, loading: true, errors: null };
    }
    case POST_LOGIN_SUCCESS: {
      const name = action.data.user.name
      const email = action.data.user.email
      return { ...state, user: { name, email }, isAuthChecked: true }
    }
    case POST_LOGIN_FAILED: {
      return { ...state, isAuthChecked: true }
    }
    case POST_LOGOUT_REQUEST: {
      return { ...state }
    }
    case POST_LOGOUT_SUCCESS: {
      return { ...state }
    }
    case POST_LOGOUT_FAILED: {
      return { ...state }
    }
    case POST_TOKEN_REQUEST: {
      return { ...state }
    }
    case POST_TOKEN_SUCCESS: {
      return { ...state }
    }
    case POST_TOKEN_FAILED: {
      return { ...state }
    }
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case PATCH_USER_REQUEST: {
      return { ...state, loading: true, errors: null }
    }
    case PATCH_USER_SUCCESS: {
      const name = action.data.user.name
      const email = action.data.user.email
      return { ...state, user: { name, email }, isAuthChecked: true }
    }
    case PATCH_USER_FAILED: {
      return { ...state, loading: false, errors: 'Что-то пошло не так...' }
    }
    default: {
      return { ...state }
    }
  }
}
