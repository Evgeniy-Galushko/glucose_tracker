import { useDispatch, useSelector } from "react-redux";
import s from "./DetailedInfo.module.css";
import { selectToken, selectUser } from "../../redux/auth/selectors.js";
import { useNavigate } from "react-router-dom";
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

  console.log(oneDay.length);

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
      <h2 className={s.titleName}>
        Привет, <span className={s.name}>{user.name}</span>
      </h2>
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
      <ul className={s.boxMonthAdd}>
        <li>{/* <p>Месяц</p> */}</li>
        <li>
          <button
            type="button"
            className={s.addButton}
            onClick={handleOpenAddingDimensionModal}
          >
            <span className={s.plusAdd}>
              <FaPlus size={10} />
            </span>
            Добавить измерение
          </button>
        </li>
      </ul>
      <ul className={s.listOfMeasurements}>
        <ListOfMeasurements
          setIdDelete={setIdDelete}
          oneDay={oneDay}
          setModalMeasurement={setModalMeasurement}
        />
      </ul>
      <Calendar
        setChartTitle={setChartTitle}
        setSelectedDay={setSelectedDay}
        setSelectedMonth={setSelectedMonth}
      />
    </>
  );
}
