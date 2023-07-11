// Эндпоинт для обновления токена
const TOKEN_HTTP = 'https://norma.nomoreparties.space/api/auth/token'
//проверка запросов сервера
const checkReponse = (res) => {
    return res.ok 
  ? res.json().then((res) => Promise.resolve(res))
  : res.json().then((err) => Promise.reject(err))
};

export function postToken() {

   return fetch(TOKEN_HTTP, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }) 
  })
    .then(checkReponse)
    
}

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await postToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.postToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

