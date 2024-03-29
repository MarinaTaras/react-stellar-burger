const INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients'
//проверка запросов сервера
const checkResponse = (res: Response) => {
  return res.ok 
  ? res.json().then((res) => Promise.resolve(res)) 
  : res.json().then((err: string) => Promise.reject(err));
};

function getIngredients() {

   return fetch(INGREDIENTS, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
    .then(checkResponse)
}

export default getIngredients