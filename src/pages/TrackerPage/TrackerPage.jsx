import { useDispatch, useSelector } from "react-redux";
import DetailedInfo from "../../components/DetailedInfo/DetailedInfo.jsx";
import MeasurementSchedule from "../../components/MeasurementSchedule/MeasurementSchedule.jsx";
import s from "./TrackerPage.module.css";
import { selectUser } from "../../redux/auth/selectors.js";
import { useEffect } from "react";
import { userInformRequest } from "../../redux/auth/operations.js";

export default function TrackerPage() {
  const dispatch = useDispatch();
  const userInformation = useSelector(selectUser);

  // console.log(userInformation);

  useEffect(() => {
    dispatch(userInformRequest());
  }, [dispatch]);

  return (
    <section>
      <ul>
        <li>
          <MeasurementSchedule />
        </li>
        <li>
          <DetailedInfo />
        </li>
      </ul>
    </section>
  );
}
