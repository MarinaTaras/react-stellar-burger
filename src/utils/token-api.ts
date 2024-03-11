import { THeaders, TResponse, TUser } from "../services/types";

// Эндпоинт для обновления токена
const TOKEN_HTTP = 'https://norma.nomoreparties.space/api/auth/token'
//проверка запросов сервера
const checkResponse = (res: Response) => {
    return res.ok 
  ? res.json().then((res: Response) => Promise.resolve(res))
  : res.json().then((err: string) => Promise.reject(err))
};

export function postToken() {

   return fetch(TOKEN_HTTP, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }) 
  })
    .then(checkResponse)
    
}

export const fetchWithRefresh = 
async <T>(url: string, options: RequestInit & { headers: THeaders}): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await <T>checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await postToken() as unknown as TResponse; //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.postToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await <T>checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

