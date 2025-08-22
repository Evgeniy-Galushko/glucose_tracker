import s from "./AddingDimensionModal.module.css";
import Modal from "react-modal";
import sprite from "../../img/icon-sprite.svg";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { useId } from "react";

export default function AddingDimensionModal({
  openModal,
  handCloseleAddingDimensionModal,
}) {
  const dateId = useId();
  const timeId = useId();
  const measurementTimeId = useId();
  const measurementPeriodID = useId();

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

  const initialValues = {
    date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
    time: `${new Date().getHours()}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, "0")}`,
    measurementTime: "",
    // onAnEmptyStomach: "", // натощак
    // afterEating: "", // после еды
  };

  const hendleSubmit = (values, actions) => {
    console.log(values);
  };

  console.log();

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={handCloseleAddingDimensionModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className={s.modalAddingDimension}>
        <button
          type="button"
          onClick={handCloseleAddingDimensionModal}
          className={s.closeButton}
        >
          <svg width={24} height={24}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>
        <h3 className={s.titleModalDelete}>
          Добавить новое измерение уровня сахара в крови.
        </h3>

        <Formik initialValues={initialValues} onSubmit={hendleSubmit}>
          {(setFieldValue, values) => (
            <Form>
              <label htmlFor={dateId}>Дата измерения</label>
              <Field
                id={dateId}
                name="date"
                required
                // type="date"
                type="text"
              />
              <label htmlFor={timeId}>Время измерения</label>
              <Field id={timeId} name="time" type="time" required />

              <label htmlFor={measurementTimeId}>Результат измерения</label>
              <Field
                id={measurementTimeId}
                // name="measurementTime"
                type="number"
              />
              <label htmlFor={measurementPeriodID}>Период измерения</label>
              <Field as="select" name="measurementTime">
                <option value="onAnEmptyStomach">натощак</option>
                <option value="afterEating">после еды</option>
              </Field>
              <button type="submit">submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
