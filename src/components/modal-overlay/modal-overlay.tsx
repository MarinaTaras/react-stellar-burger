import styles from './modal-overlay.module.css';

function ModalOverlay(props: {onClose: () => void}) {
  const {onClose} = props
  return (
    <div className={styles.overlay} onClick={onClose}></div>
  )
}

export default ModalOverlay