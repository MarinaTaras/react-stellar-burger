import { ActionCreator } from 'redux';
import { SET_AUTH_CHECKED, SET_USER } from "../services/actions/auth-actions";
import { AppDispatch, TAuthResponse, THeaders, TRegisterProps, TUser } from "../services/types";
import { fetchWithRefresh } from "./token-api";
import { Dispatch } from "react";

// Эндпоинт для авторизации пользователя
const USER_HTTP = 'https://norma.nomoreparties.space/api/auth/user'


//проверка запросов сервера
const checkResponse = (res: TAuthResponse) => {
  return res.success
    ? Promise.resolve(res)
    : Promise.reject(res)
};

export const setAuthChecked = (value: boolean) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: TUser | null) => ({
  type: SET_USER,
  payload: user,
});
//получение данных о пользователе
export const getUser = () => {
  return fetchWithRefresh<TAuthResponse>(USER_HTTP, {
    method: "GET",
    headers: {
      authorization: localStorage.getItem('accessToken'),
      "Content-Type": "application/json;charset=utf-8",
    } as (HeadersInit | undefined) & THeaders
  })
    .then(checkResponse)
}
//обновление данных о пользователе
export const patchUser = ({ name, email, password }: TRegisterProps) => {
  return fetchWithRefresh(USER_HTTP, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem('accessToken')
    } as (HeadersInit | undefined) & THeaders,
    body: JSON.stringify({
      name, email, password
    }),
  });
};

export const checkUserAuth = () => {

  return (dispatch: Dispatch<any>) => {
    if (localStorage.getItem("accessToken")) {
      getUser()
        .then((res: TAuthResponse) => {
          dispatch(setUser(res.user as TUser));
          dispatch(setAuthChecked(true))
        })
        .catch((err) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(err));
        })
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};