import s from "./LogOutModal.module.css";
import Modal from "react-modal";
import sprite from "../../img/icon-sprite.svg";
import { clsx } from "clsx";

export default function LogOutModal({
  openModal,
  handleCloseModalLogOut,
  handleLogOut,
}) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(25, 26, 21, 0.3)",
    },
    content: {
      border: "none",
      // overflow: "auto",

      padding: "none",
      borderRadius: "15px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={handleCloseModalLogOut}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className={s.logOutModal}>
        <button
          type="button"
          onClick={handleCloseModalLogOut}
          className={s.closeButton}
        >
          <svg className={s.icon} width={24} height={24}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>
        <h3 className={s.titleModalLogOut}>Выйти</h3>
        <p className={s.paragraphModalLogOut}>Вы действительно хотите уйти?</p>
        <ul className={s.boxButton}>
          <li>
            <button className={s.button} type="button" onClick={handleLogOut}>
              Выйти
            </button>
          </li>
          <li>
            <button
              className={clsx(s.button, s.buttonCancel)}
              onClick={handleCloseModalLogOut}
              type="button"
            >
              Отмена
            </button>
          </li>
        </ul>
      </div>
    </Modal>
  );
}
