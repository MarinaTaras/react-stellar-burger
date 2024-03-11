import { TRegisterProps } from "../services/types";

// Эндпоинт для создания пользователя
const REGISTER_HTTP = 'https://norma.nomoreparties.space/api/auth/register'
//проверка запросов сервера
const checkResponse = (res: Response) => {
  return res.ok
    ? res.json().then((res) => Promise.resolve(res))
    : res.json().then((err: string) => Promise.reject(err))
};

function postRegister({ email, password, name }: TRegisterProps) {

  return fetch(REGISTER_HTTP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' } as HeadersInit,
    body: JSON.stringify({
      "email": `${email}`,
      "password": `${password}`,
      "name": `${name}`
    })
  })
    .then(checkResponse)

}

export default postRegister
