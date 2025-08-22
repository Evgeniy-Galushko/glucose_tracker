import { useDispatch, useSelector } from "react-redux";
import DetailedInfo from "../../components/DetailedInfo/DetailedInfo.jsx";
import MeasurementSchedule from "../../components/MeasurementSchedule/MeasurementSchedule.jsx";
import s from "./TrackerPage.module.css";
import { selectToken, selectUser } from "../../redux/auth/selectors.js";
import { useEffect, useState } from "react";
import {
  signoutRequest,
  userInformRequest,
} from "../../redux/auth/operations.js";
import { useNavigate } from "react-router-dom";
import {
  oneDayRequest,
  oneMonthRequest,
} from "../../redux/measuring/operations.js";
import UserSettingsModal from "../../components/UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../../components/LogOutModal/LogOutModal.jsx";
import DeleteMeasurementModal from "../../components/DeleteMeasurementModal/DeleteMeasurementModal.jsx";
import AddingDimensionModal from "../../components/AddingDimensionModal/AddingDimensionModal.jsx";

export default function TrackerPage() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [screenSize, setScreenSize] = useState(null);
  const [graphHeights, setGraphHeights] = useState(null);
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
  const dispatch = useDispatch();
  const userInformation = useSelector(selectUser);

  useEffect(() => {
    dispatch(userInformRequest());
    dispatch(oneMonthRequest(selectedMonth));
    dispatch(oneDayRequest(selectedDay));
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (windowSize.width < 768) {
      setScreenSize(311);
      setGraphHeights(200);
    }
    if (windowSize.width >= 768 && windowSize.width < 1440) {
      setScreenSize(640);
      setGraphHeights(250);
    }
    if (windowSize.width >= 1440) {
      setScreenSize(590);
      setGraphHeights(300);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, windowSize.width, userInformation, selectedDay, selectedMonth]);

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
      <AddingDimensionModal
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
          <MeasurementSchedule
            screenSize={screenSize}
            graphHeights={graphHeights}
          />
        </li>
        <li className={s.boxDetailed}>
          <DetailedInfo
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
