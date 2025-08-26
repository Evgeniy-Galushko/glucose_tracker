import s from "./UserSettingsModal.module.css";
import sprite from "../../img/icon-sprite.svg";
import Modal from "react-modal";
import { Field, Form, Formik } from "formik";
import { useId } from "react";
import { selectUser } from "../../redux/auth/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import rendersYear from "../../utils/rendersYear.js";
import { clsx } from "clsx";
import { userUpdatingRequest } from "../../redux/auth/operations.js";

export default function UserSettingsModal({
  openModal,
  handleCloseUserSettingsModal,
}) {
  const genderIdMan = useId();
  const genderIdWoman = useId();
  const ageId = useId();
  const weightId = useId();
  const heightId = useId();
  const nameId = useId();
  const bloodSugarNormId = useId();
  const userInformation = useSelector(selectUser);
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
    age: "",
    weight: "",
    height: "",
    name: "",
    bloodSugarNorm: "",
    gender: userInformation.gender,
    birthYear: "",
  };

  const handleSubmit = async (values, actions) => {
    dispatch(userUpdatingRequest(values));
  };

  // console.log(userInformation);
  const listYear = rendersYear();

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
        <h2 className={s.titleSetting}>Параметры</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form>
              <p className={s.headlines}>Ваша пол</p>
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
              <ul className={s.boxUserData}>
                <li className={s.boxInput}>
                  <label className={s.headlines} htmlFor={nameId}>
                    Ваше имя
                  </label>
                  <Field
                    className={s.input}
                    id={nameId}
                    type="text"
                    name="name"
                    placeholder={userInformation.name}
                  />
                </li>
                <li className={s.boxInput}>
                  <label className={s.headlines} htmlFor={ageId}>
                    Ваш возраст
                  </label>
                  <div className={s.boxSelect}>
                    <Field
                      className={s.select}
                      // id={ageId}
                      as="select"
                      name="birthYear"
                      value={values.birthYear}
                      onChange={(e) => {
                        const userData = e.target.value;
                        setFieldValue("birthYear", userData);
                        const currentDate = new Date();
                        const difference = currentDate.getFullYear() - userData;

                        setFieldValue("age", difference);

                        if (difference === 0) {
                          setFieldValue("bloodSugarNorm", 4.4);
                        }
                        if (difference > 0 && difference <= 14) {
                          setFieldValue("bloodSugarNorm", 5.5);
                        }
                        if (difference > 14 && difference <= 60) {
                          setFieldValue("bloodSugarNorm", 5.9);
                        }
                        if (difference > 60 && difference <= 90) {
                          setFieldValue("bloodSugarNorm", 6.4);
                        }
                        if (difference > 90) {
                          setFieldValue("bloodSugarNorm", 6.7);
                        }
                      }}
                    >
                      <option>Выберите год рождения</option>
                      {listYear.map((year, index) => {
                        return (
                          <option key={index} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </Field>
                    <Field
                      className={clsx(s.select, s.inputAge)}
                      id={ageId}
                      type="text"
                      name="age"
                      value={
                        values.age >= 0 ? values.age : userInformation.age || 0
                      }
                      placeholder={userInformation.age || 0}
                      readOnly
                    />
                    <svg className={clsx(s.iconLabel)}>
                      <use href={`${sprite}#icon-arrow-left`} />
                    </svg>
                  </div>
                </li>
                <li className={s.boxInput}>
                  <label className={s.headlines} htmlFor={weightId}>
                    Ваш вес
                  </label>
                  <Field
                    className={s.input}
                    id={weightId}
                    type="number"
                    name="weight"
                    placeholder={userInformation.weight}
                  />
                </li>
                <li className={s.boxInput}>
                  <label className={s.headlines} htmlFor={heightId}>
                    Ваш рост
                  </label>
                  <Field
                    className={s.input}
                    id={heightId}
                    type="number"
                    name="height"
                    placeholder={userInformation.height}
                  />
                </li>
                <li className={s.boxInput}>
                  <label className={s.headlines} htmlFor={bloodSugarNormId}>
                    <span className={s.footnote}>*</span> Норма сахара в крови
                  </label>
                  <Field
                    className={s.input}
                    id={bloodSugarNormId}
                    type="number"
                    name="bloodSugarNorm"
                    value={values.bloodSugarNorm}
                    placeholder={userInformation.bloodSugarNorm}
                    readOnly
                  />
                </li>
              </ul>
              <h3 className={s.titleDescription}>
                <span className={s.footnote}>*</span> Норма сахара в крови
                рассчитывается в зависимости от возраста.
              </h3>
              <div className={s.boxLevelDescription}>
                <h4 className={s.subparagraphs}>Норма сахара на тощак:</h4>
                <ul>
                  <li>
                    <p className={s.paragraph}>
                      - новорожденные (до 1 мес): 2.8 – 4.4 ммоль/л.
                    </p>
                  </li>
                  <li>
                    <p className={s.paragraph}>
                      - 1 мес – 6 лет: 3.3 – 5.5 ммоль/л.
                    </p>
                  </li>
                  <li>
                    <p className={s.paragraph}>
                      - 6 – 14 лет: 3.3 – 5.5 ммоль/л.
                    </p>
                  </li>
                  <li>
                    <p className={s.paragraph}>
                      - взрослые от 14 до 60 лет: 4.1 - 5.9 ммоль/л.
                    </p>
                  </li>
                  <li>
                    <p className={s.paragraph}>
                      - пожилые люди (60+ лет): 4.6 - 6.4 ммоль/л.
                    </p>
                  </li>
                  <li>
                    <p className={s.paragraph}>
                      - люди старше 90 лет: 4.2 - 6.7 ммоль/л.
                    </p>
                  </li>
                </ul>
                <h4 className={s.subparagraphs}>Через 2 часа после еды:</h4>
                <ul>
                  <li>
                    <p className={s.paragraph}>
                      - новорожденные (до 1 мес) до 5.5 ммоль/л
                    </p>
                  </li>
                  <li>
                    <p className={s.paragraph}>
                      - 1 мес – 6 лет до 7.8 ммоль/л
                    </p>
                  </li>
                  <li>
                    <p className={s.paragraph}>- 6 – 14 лет до 7.8 ммоль/л</p>
                  </li>
                  <li>
                    <p className={s.paragraph}>
                      -взрослые от 14 до 60 лет: до 7.8 ммоль/л
                    </p>
                  </li>
                  <li>
                    <p className={s.paragraph}>
                      - пожилые люди (60+ лет): до 8.0 ммоль/л
                    </p>
                  </li>
                  <li>
                    <p className={s.paragraph}>
                      - люди старше 90 лет: 4.2 - до 8.5 ммоль/л
                    </p>
                  </li>
                </ul>
              </div>
              <button className={s.buttonSubmit} type="submit">
                Сохранять
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
