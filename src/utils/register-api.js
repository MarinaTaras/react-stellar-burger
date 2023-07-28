// Эндпоинт для создания пользователя
const REGISTER_HTTP = 'https://norma.nomoreparties.space/api/auth/register'
//проверка запросов сервера
const checkResponse = (res) => {
  return res.ok
    ? res.json().then((res) => Promise.resolve(res))
    : res.json().then((err) => Promise.reject(err))
};

function postRegister({ email, password, name }) {

  return fetch(REGISTER_HTTP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "email": `${email}`,
      "password": `${password}`,
      "name": `${name}`
    })
  })
    .then(checkResponse)

}

export default postRegister
