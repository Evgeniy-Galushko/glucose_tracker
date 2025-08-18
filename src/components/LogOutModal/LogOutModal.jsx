import s from "./LogOutModal.module.css";
import Modal from "react-modal";
import sprite from "../../img/icon-sprite.svg";

export default function LogOutModal() {
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
    <Modal style={customStyles} ariaHideApp={false}>
      <button
        type="button"
        // onClick={handleCloseUserSettingsModal}
        className={s.closeButton}
      >
        <svg className={s.icon} width={24} height={24}>
          <use href={`${sprite}#icon-close`} />
        </svg>
      </button>
    </Modal>
  );
}
