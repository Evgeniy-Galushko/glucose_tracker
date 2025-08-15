import { useDispatch, useSelector } from "react-redux";
import DetailedInfo from "../../components/DetailedInfo/DetailedInfo.jsx";
import MeasurementSchedule from "../../components/MeasurementSchedule/MeasurementSchedule.jsx";
import s from "./TrackerPage.module.css";
import { selectToken, selectUser } from "../../redux/auth/selectors.js";
import { useEffect, useState } from "react";
import { userInformRequest } from "../../redux/auth/operations.js";
import { useNavigate } from "react-router-dom";
import {
  oneDayRequest,
  oneMonthRequest,
} from "../../redux/measuring/operations.js";

export default function TrackerPage() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [screenSize, setScreenSize] = useState(null);
  const [graphHeights, setGraphHeights] = useState(null);
  const dispatch = useDispatch();
  const userInformation = useSelector(selectUser);

  console.log(userInformation);

  useEffect(() => {
    dispatch(userInformRequest());
    dispatch(oneMonthRequest("2025-08"));
    dispatch(oneDayRequest("2025-08-15"));
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
  }, [dispatch, windowSize.width]);

  // console.log(windowSize.width >= 1440);

  // console.log(screenSize);
  // console.log(windowSize.width >= 768 && windowSize.width < 1440);

  return (
    <section className={s.sectionTracker}>
      <ul className={s.tracker}>
        <li className={s.boxTracker}>
          <MeasurementSchedule
            screenSize={screenSize}
            graphHeights={graphHeights}
          />
        </li>
        <li className={s.boxTracker}>
          <DetailedInfo />
        </li>
      </ul>
    </section>
  );
}
