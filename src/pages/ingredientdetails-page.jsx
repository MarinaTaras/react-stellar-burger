import { useDispatch, useSelector } from "react-redux";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useParams } from "react-router-dom";

function IngredientDetailsPage() {
  const dispatch = useDispatch() 
  const { ingredientId } = useParams()
  const { items } = useSelector(state => state.ingredients);

// в момент, когда данных нет, не выдает ошибку:
  const emptyItem = {
    type: '',
    name: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    image_large: ''
  }

  const item = items.find((el => el['_id'] === ingredientId)) || emptyItem

  return <IngredientDetails data={item}/>
}

export default IngredientDetailsPage
