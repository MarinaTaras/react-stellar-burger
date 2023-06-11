import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-item.module.css";
import { CHANGE_COUNT, REMOVE_INGRIDIENT } from "../../services/actions/actions";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react";


export function ConstructorItem({ ingredientItem, moveHandler }) {

  const id = ingredientItem.key;
  const ingredients = useSelector((state) => state.constructorIngredients);
  const index = ingredients.indexOf(ingredientItem);

  const store = useStore()
  const dispatch = useDispatch()
  const itemIndex = ingredientItem?._id || null
  
  const ref = useRef(null);
  const [, dragRef] = useDrag({
    type: "item",
    item: () => ({ id, index }),
    collect: (monitor) => ({
      item: monitor.getItem()
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: "item",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) return;
      
      // нахождение области на экране
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // нахождение вертикальной середины
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      //Перетаскивание вверх
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });
  
  const DnDRef = dragRef(dropRef(ref));

  // удаление ингридиента
  const deleteIngredient = () => {
    const deliteConstructorIngridient = {
      type: REMOVE_INGRIDIENT,
      data: ingredientItem
    }
    dispatch(deliteConstructorIngridient)
    updateCount()
  }

  function updateCount() {
    let data = {}
    const items = store.getState().constructorIngredients
    items.forEach(item => {
      if (data[item._id]) { data[item._id]++ }
      else { data[item._id] = 1 }
    })
    dispatch({ type: CHANGE_COUNT, data })
  }

  return (
    <div className={styles.component} data-handler-id={handlerId}
      ref={DnDRef} >
      <DragIcon type="primary" />
      <ConstructorElement
        thumbnail={ingredientItem.image} price={ingredientItem.price}
        handleClose={() => deleteIngredient()}
        text={ingredientItem.name} />
    </div>

  )
}
