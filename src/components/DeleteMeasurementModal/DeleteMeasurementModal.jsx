import s from "./DeleteMeasurementModal.module.css";
import Modal from "react-modal";
import sprite from "../../img/icon-sprite.svg";
import { clsx } from "clsx";
import { useDispatch } from "react-redux";
import {
  deleteMeasuringRequest,
  oneDayRequest,
} from "../../redux/measuring/operations.js";

export default function DeleteMeasurementModal({
  openModal,
  handleCloseModalMeasurement,
  idDelete,
}) {
  const dispatch = useDispatch();
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

  const handleDeleteCart = async () => {
    dispatch(deleteMeasuringRequest(idDelete));
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    dispatch(
      oneDayRequest(
        `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`
      )
    );
    handleCloseModalMeasurement();
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={handleCloseModalMeasurement}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className={s.modalDelete}>
        <button
          type="button"
          onClick={handleCloseModalMeasurement}
          className={s.closeButton}
        >
          <svg width={24} height={24}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>
        <h3 className={s.titleModalDelete}>Удалить запись</h3>
        <p className={s.paragraphModalDelete}>
          Вы уверены, что хотите удалить запись?
        </p>
        <ul className={s.boxButton}>
          <li>
            <button
              className={s.button}
              type="button"
              onClick={handleDeleteCart}
            >
              Удалить
            </button>
          </li>
          <li>
            <button
              className={clsx(s.button, s.buttonCancel)}
              onClick={handleCloseModalMeasurement}
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
