import { THeaders } from "../services/types";

// Эндпоинт для создания пользователя
const LOGOUT_HTTP = 'https://norma.nomoreparties.space/api/auth/logout'
//проверка запросов сервера
const checkResponse = (res: Response) => {
  return res.ok
    ? res.json().then((res) => Promise.resolve(res))
    : res.json().then((err: string) => Promise.reject(err))
};

export function postLogout() {
  return fetch(LOGOUT_HTTP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    } as HeadersInit,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then(checkResponse)

}




