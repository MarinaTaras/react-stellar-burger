// Эндпоинт для формирования номера заказаы
const ORDER = 'https://norma.nomoreparties.space/api/orders'
//проверка запросов сервера
const checkResponse = (res) => {
    return res.ok 
  ? res.json().then((res) => Promise.resolve(res))
  : res.json().then((err) => Promise.reject(err))
};

function getOrder(idArr) {
  const accessToken = localStorage.getItem("accessToken");
   return fetch(ORDER, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'authorization': accessToken},
    
    body: JSON.stringify({ "ingredients": idArr }) 
  })
    .then(checkResponse)
    
}

export default getOrder