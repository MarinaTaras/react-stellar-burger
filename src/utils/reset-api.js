// Эндпоинт для восстановления пароля
const RESET_HTTP = 'https://norma.nomoreparties.space/api/password-reset/reset'
//проверка запросов сервера
const checkResponse = (res) => {
    return res.ok 
  ? res.json().then((res) => Promise.resolve(res))
  : res.json().then((err) => Promise.reject(err))
};

function postReset({ password, token }) {

   return fetch(RESET_HTTP, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ "password":`${password}`,
  "token": `${token}` }) 
  })
    .then(checkResponse)
    
}

export default postReset