// Эндпоинт для создания пользователя
const LOGIN_HTTP = 'https://norma.nomoreparties.space/api/auth/login'
//проверка запросов сервера
const checkResponse = (res: Response) => {
  return res.ok
    ? res.json().then((res) => Promise.resolve(res))
    : res.json().then((err: string) => Promise.reject(err))
};

type TLoginProps = {
  email: string, 
  password: string
}

function postLogin({ email, password }: TLoginProps) {
  
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
