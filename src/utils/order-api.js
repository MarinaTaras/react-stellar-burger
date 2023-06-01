// Эндпоинт для формирования номера заказаы
const ORDER = 'https://norma.nomoreparties.space/api/orders'
//проверка запросов сервера
const checkReponse = (res) => {
    return res.ok 
  ? res.json().then((res) => Promise.resolve(res))
  : res.json().then((err) => Promise.reject(err))
};

function getOrder(idArr) {

   return fetch(ORDER, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ "ingredients": idArr }) 
  })
    .then(checkReponse)
    
}

export default getOrder