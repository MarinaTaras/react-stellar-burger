import { TUser } from '../types'

//регистрация
export const POST_REGISTER_REQUEST: 'POST_REGISTER_REQUEST' = 'POST_REGISTER_REQUEST'
export const POST_REGISTER_SUCCESS: 'POST_REGISTER_SUCCESS' = 'POST_REGISTER_SUCCESS'
export const POST_REGISTER_FAILED: 'POST_REGISTER_FAILED' = 'POST_REGISTER_FAILED'
//логин
export const POST_LOGIN_REQUEST: 'POST_LOGIN_REQUEST' = 'POST_LOGIN_REQUEST'
export const POST_LOGIN_SUCCESS: 'POST_LOGIN_SUCCESS' = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_FAILED: 'POST_LOGIN_FAILED' = 'POST_LOGIN_FAILED'
//обновление
export const PATCH_USER_REQUEST: 'PATCH_USER_REQUEST' = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS' = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED: 'PATCH_USER_FAILED' = 'PATCH_USER_FAILED';
//выход
export const POST_LOGOUT_REQUEST: 'POST_LOGOUT_REQUEST' = 'POST_LOGOUT_REQUEST'
export const POST_LOGOUT_SUCCESS: 'POST_LOGOUT_SUCCESS' = 'POST_LOGOUT_SUCCESS'
export const POST_LOGOUT_FAILED: 'POST_LOGOUT_FAILED' = 'POST_LOGOUT_FAILED'
//токен
export const POST_TOKEN_REQUEST: 'POST_TOKEN_REQUEST' = 'POST_TOKEN_REQUEST'
export const POST_TOKEN_SUCCESS: 'POST_TOKEN_SUCCESS' = 'POST_TOKEN_SUCCESS'
export const POST_TOKEN_FAILED: 'POST_TOKEN_FAILED' = 'POST_TOKEN_FAILED'

export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const SET_USER: 'SET_USER' = 'SET_USER'

export interface IPostRegisterRequestAction {
  readonly type: typeof POST_REGISTER_REQUEST;
}

export interface IPostRegisterSuccessAction {
  readonly type: typeof POST_REGISTER_SUCCESS;
  readonly user: TUser
  readonly name: string
  readonly email: string
  data: any
}

export interface IPostRegisterFailedAction {
  readonly type: typeof POST_REGISTER_FAILED;
}

export interface IPostLoginRequestAction {
  readonly type: typeof POST_LOGIN_REQUEST;
}

export interface IPostLoginSuccessAction {
  readonly type: typeof POST_LOGIN_SUCCESS;
  readonly user: TUser
  readonly name: string
  readonly email: string
  data: any
}

export interface IPostLoginFailedAction {
  readonly type: typeof POST_LOGIN_FAILED;
}

export interface IPatchUserRequestAction {
  readonly type: typeof PATCH_USER_REQUEST;
}

export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS;
  readonly user: TUser
  readonly name: string
  readonly email: string
  data: any
}

export interface IPatchUserFailedAction {
  readonly type: typeof PATCH_USER_FAILED;
}

export interface IPostLogoutRequestAction {
  readonly type: typeof POST_LOGOUT_REQUEST;
}

export interface IPostLogoutSuccessAction {
  readonly type: typeof POST_LOGOUT_SUCCESS;
}

export interface IPostLogoutFailedAction {
  readonly type: typeof POST_LOGOUT_FAILED;
}

export interface IPostTokenRequestAction {
  readonly type: typeof POST_TOKEN_REQUEST;
}

export interface IPostTokenSuccessAction {
  readonly type: typeof POST_TOKEN_SUCCESS;
}

export interface IPostTokenFailedAction {
  readonly type: typeof POST_TOKEN_FAILED;
}

export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly isAuthChecked: boolean
  payload: boolean
  readonly user: TUser
}

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly user: TUser
  payload: TUser
}

export type TAuthActions =
  | IPostRegisterRequestAction
  | IPostRegisterSuccessAction
  | IPostRegisterFailedAction
  | IPostLoginRequestAction
  | IPostLoginSuccessAction
  | IPostLoginFailedAction
  | IPatchUserRequestAction
  | IPatchUserSuccessAction
  | IPatchUserFailedAction
  | IPostLogoutRequestAction
  | IPostLogoutSuccessAction
  | IPostLogoutFailedAction
  | IPostTokenRequestAction
  | IPostTokenSuccessAction
  | IPostTokenFailedAction
  | ISetAuthCheckedAction
  | ISetUserAction

