export const state = {
  ingredients: { items: [], loading: false, errors: false },
  constructorIngredients: [],
  currentIngredient: {
    item: {
      name: '',
      calories: 0,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      image_large: '',
      type: '',
    }
  },
  orderPrice: null
}