import { useDispatch, useSelector } from "react-redux";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useParams } from "react-router-dom";
import { TIngredient, TIngredientDetails, TState } from "../services/types";

function IngredientDetailsPage() {
  const dispatch = useDispatch()
  const { ingredientId } = useParams()
  const { items } = useSelector((state: TState) => state.ingredients);

  // в момент, когда данных нет, не выдает ошибку:
  const emptyItem: TIngredient = {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    count: null,
    id: '',
    uuid: '',
    dragIndex: 0,
    hoverIndex: 0,
    key: '',
  }

  const item: TIngredient = items.find(((el: TIngredient) => el['_id'] === ingredientId)) || emptyItem

  return <IngredientDetails data={item} />
}

export default IngredientDetailsPage
