import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";
import { TIngredient, TIngredientId } from "../services/types";

// Эндпоинт для формирования номера заказаы
const ORDER = 'https://norma.nomoreparties.space/api/orders'
//проверка запросов сервера
const checkResponse = (res: Response) => {
    return res.ok 
  ? res.json().then((res) => Promise.resolve(res))
  : res.json().then((err: string) => Promise.reject(err))
};

function getOrder(idArr: string[]) {
  const accessToken = localStorage.getItem("accessToken");
   return fetch(ORDER, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'authorization': accessToken} as HeadersInit,
    
    body: JSON.stringify({ "ingredients": idArr }) 
  })
    .then(checkResponse)
    
}

export default getOrder