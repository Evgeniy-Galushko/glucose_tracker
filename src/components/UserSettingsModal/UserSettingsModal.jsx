import s from "./UserSettingsModal.module.css";
import sprite from "../../img/icon-sprite.svg";
import Modal from "react-modal";
import { Field, Form, Formik } from "formik";
import { useId } from "react";
import { selectUser } from "../../redux/auth/selectors.js";
import { useSelector } from "react-redux";

export default function UserSettingsModal({
  openModal,
  handleCloseUserSettingsModal,
  userSettingsModal,
}) {
  const genderIdMan = useId();
  const genderIdWoman = useId();
  const ageId = useId();
  const weightId = useId();
  const heightId = useId();
  const nameId = useId();
  const bloodSugarNormId = useId();
  const userInformation = useSelector(selectUser);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(25, 26, 21, 0.3)",
    },
    content: {
      border: "none",
      overflow: "auto",
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
    age: "",
    weight: "",
    height: "",
    name: "",
    bloodSugarNorm: "",
    gender: userInformation.gender,
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
  };

  console.log(userInformation);

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={handleCloseUserSettingsModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className={s.modal}>
        <button
          type="button"
          onClick={handleCloseUserSettingsModal}
          className={s.closeButton}
        >
          <svg className={s.icon} width={24} height={24}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>
        <h2>Параметры</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form>
              <p>Ваша пол</p>
              <ul className={s.fullscreenContainer}>
                <li className={s.radioGroupContainer}>
                  <label htmlFor={genderIdMan} className={s.radioLabel}>
                    <Field
                      id={genderIdMan}
                      name="gender"
                      type="radio"
                      value="man"
                      className={s.radioInput}
                      // checked={userInformation.gender === "man"}
                    />
                    <span className={s.radioCustom}></span>
                    <span className={s.radioText}>Мужчина</span>
                  </label>
                </li>
                <li className={s.radioGroupContainer}>
                  <label htmlFor={genderIdWoman} className={s.radioLabel}>
                    <Field
                      className={s.radioInput}
                      id={genderIdWoman}
                      name="gender"
                      type="radio"
                      value="woman"
                      // checked={userInformation.gender === "woman"}
                    />
                    <span className={s.radioCustom}></span>
                    <span className={s.radioText}>Женщина</span>
                  </label>
                </li>
              </ul>
              <ul>
                <li>
                  <label htmlFor={nameId}>Ваше имя</label>
                  <Field
                    id={nameId}
                    type="text"
                    name="name"
                    placeholder={userInformation.name}
                  />
                </li>
                <li>
                  <label htmlFor={ageId}>Ваш возраст</label>
                  <Field
                    id={ageId}
                    type="number"
                    name="age"
                    placeholder={userInformation.age}
                  />
                </li>
                <li>
                  <label htmlFor={weightId}>Ваш вес</label>
                  <Field
                    id={weightId}
                    type="number"
                    name="weight"
                    placeholder={userInformation.weight}
                  />
                </li>
                <li>
                  <label htmlFor={heightId}>Ваш рост</label>
                  <Field
                    id={heightId}
                    type="number"
                    name="height"
                    placeholder={userInformation.height}
                  />
                </li>
                <li>
                  <label htmlFor={bloodSugarNormId}>Норма сахара в крови</label>
                  <Field
                    id={bloodSugarNormId}
                    type="number"
                    name="bloodSugarNorm"
                    placeholder={userInformation.bloodSugarNorm}
                  />
                </li>
              </ul>
              <button type="submit">Сохранять</button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
