import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from '../modal-overlay/modal-overlay';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";



function Modal({children, onClose}) {
  //const { children, onClose } = this.props;
  // Возвращаем ReactDOM.createPortal, 
  // который поместит дочерние элементы в modalRoot
  
  const modalRoot = document.getElementById("react-modals");
  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={onClose} />
        <div className={styles.modal}>
          
          <button onClick={onClose} className={styles.button_close}>
            <CloseIcon />
          </button>
          {children}
        </div>
      </>
    ),
    modalRoot
  );


}

export default Modal