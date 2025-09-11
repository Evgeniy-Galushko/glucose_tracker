import { useDispatch, useSelector } from "react-redux";
import s from "./DetailedInfo.module.css";
import {
  selectErrorUser,
  selectToken,
  selectUser,
} from "../../redux/auth/selectors.js";
import { useNavigate } from "react-router-dom";
import { BsGear } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

import sprite from "../../img/icon-sprite.svg";
import { useEffect, useState } from "react";
import DeleteMeasurementModal from "../DeleteMeasurementModal/DeleteMeasurementModal.jsx";
import ListOfMeasurements from "../ListOfMeasurements/ListOfMeasurements.jsx";
import { selectError, selectOneDay } from "../../redux/measuring/selectors.js";
import Calendar from "../Calendar/Calendar.jsx";
import { errorNotAuthorized } from "../../redux/auth/slice.js";
import { errorReset } from "../../redux/measuring/slice.js";

export default function DetailedInfo({
  setUserSettingsModal,
  setModalLogOut,
  setSelectedDay,
  setSelectedMonth,
  setAddingDimensionModal,
  // setChartTitle,
}) {
  const [modalMeasurement, setModalMeasurement] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const oneDay = useSelector(selectOneDay);
  const error = useSelector(selectErrorUser);
  const errorMeasuring = useSelector(selectError);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    if (error) {
      if (error.includes("401")) {
        dispatch(errorNotAuthorized());
        dispatch(errorReset());
        // console.log("err");
      }
    }

    if (errorMeasuring) {
      if (errorMeasuring.includes("401")) {
        dispatch(errorNotAuthorized());
        dispatch(errorReset());
        // console.log("err");
      }
    }
  }, [navigate, token, oneDay, error, dispatch, errorMeasuring]);

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
        // setChartTitle={setChartTitle}
        setSelectedDay={setSelectedDay}
        setSelectedMonth={setSelectedMonth}
      />
    </>
  );
}
