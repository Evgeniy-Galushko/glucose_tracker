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

export default function TrackerPage() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [screenSize, setScreenSize] = useState(null);
  const [graphHeights, setGraphHeights] = useState(null);
  const [userSettingsModal, setUserSettingsModal] = useState(false);
  const [modalLogOut, setModalLogOut] = useState(false);

  const dispatch = useDispatch();
  const userInformation = useSelector(selectUser);

  // console.log(userInformation);

  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    dispatch(userInformRequest());
    dispatch(oneMonthRequest("2025-08"));
    dispatch(
      oneDayRequest(
        `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`
      )
    );
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
      setScreenSize(640);
      setGraphHeights(300);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, windowSize.width, userInformation]);

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

  return (
    <section className={s.sectionTracker}>
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
        <li className={s.boxTracker}>
          <DetailedInfo
            setUserSettingsModal={setUserSettingsModal}
            setModalLogOut={setModalLogOut}
          />
        </li>
      </ul>
    </section>
  );
}
