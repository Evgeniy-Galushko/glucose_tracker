import { useDispatch, useSelector } from "react-redux";
import DetailedInfo from "../../components/DetailedInfo/DetailedInfo.jsx";
import MeasurementSchedule from "../../components/MeasurementSchedule/MeasurementSchedule.jsx";
import s from "./TrackerPage.module.css";
import { selectToken, selectUser } from "../../redux/auth/selectors.js";
import { Suspense, useEffect, useState } from "react";
import {
  signoutRequest,
  userInformRequest,
} from "../../redux/auth/operations.js";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  oneDayRequest,
  oneMonthRequest,
} from "../../redux/measuring/operations.js";
import UserSettingsModal from "../../components/UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../../components/LogOutModal/LogOutModal.jsx";
import DeleteMeasurementModal from "../../components/DeleteMeasurementModal/DeleteMeasurementModal.jsx";
import AddingDimensionModal from "../../components/AddingDimensionModal/AddingDimensionModal.jsx";

export default function TrackerPage() {
  const [userSettingsModal, setUserSettingsModal] = useState(false);
  const [modalLogOut, setModalLogOut] = useState(false);
  const [addingDimensionModal, setAddingDimensionModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`
  );
  const [selectedMonth, setSelectedMonth] = useState(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}`
  );
  const [chartTitle, setChartTitle] = useState("");
  const [addingDimension, setAddingDimension] = useState({});
  const dispatch = useDispatch();
  const userInformation = useSelector(selectUser);

  // console.log(!userInformation.age);
  // console.log(userInformation.age);

  useEffect(() => {
    let timeId;
    if (!userInformation.age) {
      timeId = setInterval(() => {
        toast.error(
          "Вы не внесли свои данные, чтоб корректно отображался уровень сахара!"
        );
      }, 180000);
      // console.log(timeId);
    }

    // if (timeId) clearInterval(timeId);

    dispatch(userInformRequest());
    dispatch(oneMonthRequest(selectedMonth));
    dispatch(oneDayRequest(selectedDay));
    return () => {
      if (timeId) clearInterval(timeId);
    };
  }, [
    dispatch,
    userInformation.age,
    userInformation,
    selectedDay,
    selectedMonth,
    addingDimension,
  ]);

  const handleCloseUserSettingsModal = () => {
    setUserSettingsModal(false);
  };

  const handleCloseModalLogOut = () => {
    setModalLogOut(false);
  };

  const handleLogOut = () => {
    dispatch(signoutRequest());
    setModalLogOut(false);
  };

  const handCloseleAddingDimensionModal = () => {
    setAddingDimensionModal(false);
  };

  return (
    <section className={s.sectionTracker}>
      <Toaster
        toastOptions={{
          className: "",
          duration: 3000,
          style: {},
        }}
      />
      <AddingDimensionModal
        setAddingDimension={setAddingDimension}
        openModal={addingDimensionModal}
        handCloseleAddingDimensionModal={handCloseleAddingDimensionModal}
      />
      <UserSettingsModal
        openModal={userSettingsModal}
        handleCloseUserSettingsModal={handleCloseUserSettingsModal}
      />
      <LogOutModal
        handleLogOut={handleLogOut}
        openModal={modalLogOut}
        handleCloseModalLogOut={handleCloseModalLogOut}
      />
      <ul className={s.tracker}>
        <li className={s.boxTracker}>
          {/* <MeasurementSchedule /> */}
          <ul>
            <li>
              <NavLink to="/tracker/charts">Графики</NavLink>
            </li>
            <li>
              <NavLink to="/tracker/all_dimensions">Список измерений</NavLink>
            </li>
          </ul>
          <Suspense fallback={<div>loading date...</div>}>
            <Outlet />
          </Suspense>
        </li>
        <li className={s.boxDetailed}>
          <DetailedInfo
            setChartTitle={setChartTitle}
            setAddingDimensionModal={setAddingDimensionModal}
            setSelectedDay={setSelectedDay}
            setSelectedMonth={setSelectedMonth}
            setUserSettingsModal={setUserSettingsModal}
            setModalLogOut={setModalLogOut}
          />
        </li>
      </ul>
    </section>
  );
}
