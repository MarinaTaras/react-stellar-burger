import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from "react-dom";
import { SyntheticEvent, useEffect } from "react";

type modalProps = {
  children: JSX.Element
  onClose: () => void
}

function Modal(props: modalProps ) {

const { children, onClose } = props

  //Добавлено закрытие по ESC 
  useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEsc);
  }, [onClose]);

  // Возвращаем ReactDOM.createPortal, 
  // который поместит дочерние элементы в modalRoot

  const modalRoot: HTMLElement | null = document.getElementById("react-modals");
  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={onClose} />
        <div className={styles.modal}>
          <button onClick={onClose} className={styles.button_close}>
            <CloseIcon type='secondary' />
          </button>
          {children}
        </div>
      </>
    ),
    modalRoot as Element
  );
}

export default Modal