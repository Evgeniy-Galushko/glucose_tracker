import { useDispatch, useSelector } from "react-redux";
import s from "./DetailedInfo.module.css";
import { selectToken, selectUser } from "../../redux/auth/selectors.js";
import { NavLink, useNavigate } from "react-router-dom";
import { BsGear } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

import sprite from "../../img/icon-sprite.svg";
import { useEffect, useState } from "react";
import DeleteMeasurementModal from "../DeleteMeasurementModal/DeleteMeasurementModal.jsx";
import ListOfMeasurements from "../ListOfMeasurements/ListOfMeasurements.jsx";
import { selectOneDay } from "../../redux/measuring/selectors.js";
import Calendar from "../Calendar/Calendar.jsx";

export default function DetailedInfo({
  setUserSettingsModal,
  setModalLogOut,
  setSelectedDay,
  setSelectedMonth,
  setAddingDimensionModal,
  setChartTitle,
}) {
  const [modalMeasurement, setModalMeasurement] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const oneDay = useSelector(selectOneDay);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token, oneDay]);

  const handleOpenUserSettingsModal = () => {
    setUserSettingsModal(true);
  };

  const handleOpenModalLogOut = () => {
    setModalLogOut(true);
  };

  const handleCloseModalMeasurement = () => {
    setModalMeasurement(false);
  };

  const handleOpenAddingDimensionModal = () => {
    setAddingDimensionModal(true);
  };

  return (
    <>
      <DeleteMeasurementModal
        idDelete={idDelete}
        openModal={modalMeasurement}
        handleCloseModalMeasurement={handleCloseModalMeasurement}
      />
      <div className={s.boxNameAndSettings}>
        <ul>
          <li>
            <h2 className={s.titleName}>
              Привет, <span className={s.name}>{user.name}</span>
            </h2>
          </li>
          <li>
            <NavLink to="/allDimensions">Список всех измерений</NavLink>
          </li>
        </ul>
        <ul className={s.boxButton}>
          <li>
            <button
              type="button"
              className={s.buttonNavigate}
              onClick={handleOpenUserSettingsModal}
            >
              <BsGear size={16} /> Параметр
            </button>
          </li>
          <li>
            <button
              className={s.buttonNavigate}
              type="button"
              onClick={handleOpenModalLogOut}
            >
              <FiLogOut size={16} /> Выход
            </button>
          </li>
        </ul>
      </div>
      <ul className={s.boxMonthAdd}>
        <li>{/* <p>Месяц</p> */}</li>
        <li>
          <button
            type="button"
            className={s.addButton}
            onClick={handleOpenAddingDimensionModal}
          >
            <span className={s.plusAdd}>
              <FaPlus className={s.iconPluss} />
            </span>
            Добавить измерение
          </button>
        </li>
      </ul>
      {oneDay.length === 0 ? (
        <p className={s.titleStub}>Вы еще не добавили измерений сахара!</p>
      ) : (
        <>
          <ul className={s.listOfMeasurements}>
            <ListOfMeasurements
              setIdDelete={setIdDelete}
              oneDay={oneDay}
              setModalMeasurement={setModalMeasurement}
            />
          </ul>
          <ul className={s.designations}>
            <li className={s.oneBoDesignations}>
              <svg width={18} height={18} style={{ rotate: "180deg" }}>
                <use href={`${sprite}#icon-arrow-blue`} />
              </svg>
              <p>пониженный </p>
              {/* <div className={s.boxInstruction}>
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
                  <p className={s.paragraph}>- 6 – 14 лет: 3.3 – 5.5 ммоль/л.</p>
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
                  <p className={s.paragraph}>- 1 мес – 6 лет до 7.8 ммоль/л</p>
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
            </div> */}
            </li>
            <li className={s.oneBoDesignations}>
              <svg width={18} height={18}>
                <use href={`${sprite}#icon-green-circle`} />
              </svg>
              <p>в норме </p>
            </li>
            <li className={s.oneBoDesignations}>
              <svg width={18} height={18} style={{ rotate: "0deg" }}>
                <use href={`${sprite}#icon-arrow-red`} />
              </svg>
              <p>повышенный</p>
            </li>
          </ul>
        </>
      )}
      <Calendar
        setChartTitle={setChartTitle}
        setSelectedDay={setSelectedDay}
        setSelectedMonth={setSelectedMonth}
      />
    </>
  );
}
