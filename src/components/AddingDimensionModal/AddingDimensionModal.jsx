import s from "./AddingDimensionModal.module.css";
import Modal from "react-modal";
import sprite from "../../img/icon-sprite.svg";
import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  addMeasuringRequest,
  oneDayRequest,
  oneMonthRequest,
} from "../../redux/measuring/operations.js";

export default function AddingDimensionModal({
  openModal,
  handCloseleAddingDimensionModal,
  setAddingDimension,
}) {
  const dateId = useId();
  const timeId = useId();
  const measurementTimeId = useId();
  const measurementPeriodID = useId();
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

  const initialValues = {
    date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`,
    time: `${new Date().getHours()}:${new Date()
      .getMinutes()
      .toString()
      .padStart(2, "0")}`,
    measurementResult: "",
    measurementTime: "",
    // onAnEmptyStomach: "", // натощак
    // afterEating: "", // после еды
  };

  const pattern = Yup.object().shape({
    date: Yup.string().required("Введите дату"),
    time: Yup.string().required("Введите время"),
    measurementResult: Yup.number().required("Введите результат измерения"),
    measurementTime: Yup.string().required("Введите период измерения"),
  });

  const hendleSubmit = async (values, actions) => {
    if (values.measurementTime === "после еды") {
      await dispatch(
        addMeasuringRequest({
          date: values.date,
          time: values.time,
          measurementTime: values.measurementTime,
          afterEating: values.measurementResult,
        })
      );
      dispatch(oneDayRequest(values.date));
      dispatch(oneMonthRequest(values.date.slice(0, 7)));
    }
    if (values.measurementTime === "натощак") {
      await dispatch(
        addMeasuringRequest({
          date: values.date,
          time: values.time,
          measurementTime: values.measurementTime,
          onAnEmptyStomach: values.measurementResult,
        })
      );
      dispatch(oneDayRequest(values.date));
      dispatch(oneMonthRequest(values.date.slice(0, 7)));
    }

    handCloseleAddingDimensionModal();
  };

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
        <h3 className={s.titleModal}>
          Добавить новое измерение уровня сахара в крови.
        </h3>

        <Formik
          initialValues={initialValues}
          onSubmit={hendleSubmit}
          validationSchema={pattern}
        >
          {(setFieldValue, values) => (
            <Form>
              <div className={s.boxFields}>
                <label className={s.label} htmlFor={dateId}>
                  Дата измерения:
                </label>
                <Field
                  className={s.input}
                  id={dateId}
                  name="date"
                  required
                  type="date"
                  // type="text"
                />
                <ErrorMessage
                  component="span"
                  name="date"
                  className={s.errorMessage}
                />
              </div>
              <div className={s.boxFields}>
                <label className={s.label} htmlFor={timeId}>
                  Время измерения:
                </label>
                <Field
                  className={s.input}
                  id={timeId}
                  name="time"
                  type="time"
                  required
                />
                <ErrorMessage
                  component="span"
                  name="time"
                  className={s.errorMessage}
                />
              </div>
              <div className={s.boxFields}>
                <label className={s.label} htmlFor={measurementTimeId}>
                  Результат измерения:
                </label>
                <Field
                  className={s.input}
                  id={measurementTimeId}
                  name="measurementResult"
                  type="number"
                  required
                />
                <ErrorMessage
                  component="span"
                  name="measurementResult"
                  className={s.errorMessage}
                />
              </div>
              <div className={s.boxFields}>
                <label className={s.label} htmlFor={measurementPeriodID}>
                  Период измерения:
                </label>
                <Field
                  className={s.input}
                  as="select"
                  name="measurementTime"
                  id={measurementPeriodID}
                  required
                >
                  <option>выбрать период</option>
                  <option value="натощак">натощак</option>
                  <option value="после еды">после еды</option>
                </Field>
                <svg className={clsx(s.iconLabel)}>
                  <use href={`${sprite}#icon-arrow-left`} />
                </svg>
                <ErrorMessage
                  name="measurementTime"
                  component="span"
                  className={s.errorMessage}
                />
              </div>
              <button className={s.buttomSubmit} type="submit">
                Сохранить
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
