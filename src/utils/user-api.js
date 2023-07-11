import { SET_AUTH_CHECKED, SET_USER } from "../services/actions/auth-actions";
import { fetchWithRefresh } from "./token-api";

// Эндпоинт для авторизации пользователя
const USER_HTTP = 'https://norma.nomoreparties.space/api/auth/user'
//проверка запросов сервера
const checkReponse = (res) => {
  return res.success
    ? Promise.resolve(res.user)
    : Promise.reject()
};

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
//получение данных о пользователе
export const getUser = () => {
  return fetchWithRefresh(USER_HTTP, {
    method: "GET",
    headers: {
      authorization: localStorage.getItem('accessToken'),
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then(checkReponse)
}
//обновление данных о пользователе
export const patchUser = ({ name, email, password }) => {
  return fetchWithRefresh(USER_HTTP, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      name, email, password
    }),
  });
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      getUser()
        .then((res) => {
          dispatch(setUser(res));
          dispatch(setAuthChecked(true))
        })
        .catch((err) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};