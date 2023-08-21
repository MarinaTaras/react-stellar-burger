// Эндпоинт для сброса пароля
const RESET_PASS_HTTP = 'https://norma.nomoreparties.space/api/password-reset'
//проверка запросов сервера
const checkResponse = (res: Response) => {
    return res.ok 
  ? res.json().then((res) => Promise.resolve(res))
  : res.json().then((err: string) => Promise.reject(err))
};

function postForgot(email: string) {

   return fetch(RESET_PASS_HTTP, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ "email": `${email}` }) 
  })
    .then(checkResponse)
    
}

export default postForgot