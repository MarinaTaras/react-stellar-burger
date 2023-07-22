// Эндпоинт для создания пользователя
const LOGIN_HTTP = 'https://norma.nomoreparties.space/api/auth/login'
//проверка запросов сервера
const checkResponse = (res) => {
  return res.ok
    ? res.json().then((res) => Promise.resolve(res))
    : res.json().then((err) => Promise.reject(err))
};

function postLogin({ email, password }) {
  
  return fetch(LOGIN_HTTP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "email": `${email}`,
      "password": `${password}`
    })
  })
    .then(checkResponse)

}

export default postLogin
