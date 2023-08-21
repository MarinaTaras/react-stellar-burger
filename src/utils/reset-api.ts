// Эндпоинт для восстановления пароля
const RESET_HTTP = 'https://norma.nomoreparties.space/api/password-reset/reset'
//проверка запросов сервера
const checkResponse = (res: Response) => {
    return res.ok 
  ? res.json().then((res) => Promise.resolve(res))
  : res.json().then((err: string) => Promise.reject(err))
};

type TPostResetProps = {
  password: string, 
  token: string
}

function postReset({ password, token }: TPostResetProps) {

   return fetch(RESET_HTTP, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ "password":`${password}`,
  "token": `${token}` }) 
  })
    .then(checkResponse)
    
}

export default postReset