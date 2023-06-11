const INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients'
//проверка запросов сервера
const checkReponse = (res) => {
  return res.ok 
  ? res.json().then((res) => Promise.resolve(res)) 
  : res.json().then((err) => Promise.reject(err));
};

function getIngredients() {

   return fetch(INGREDIENTS, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
    .then(checkReponse)
}

export default getIngredients