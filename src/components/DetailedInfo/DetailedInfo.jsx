import { useDispatch, useSelector } from "react-redux";
import s from "./DetailedInfo.module.css";
import { signoutRequest } from "../../redux/auth/operations.js";
import { selectToken, selectUser } from "../../redux/auth/selectors.js";
import { useNavigate } from "react-router-dom";
import { BsGear } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

import sprite from "../../img/icon-sprite.svg";
import { useEffect } from "react";

export default function DetailedInfo({ setUserSettingsModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  // console.log(token);
  const handleLogOut = () => {
    dispatch(signoutRequest());
  };

  const handleOpenUserSettingsModal = () => {
    setUserSettingsModal(true);
  };

  return (
    <>
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
            onClick={handleLogOut}
          >
            <FiLogOut size={16} /> Выход
          </button>
        </li>
      </ul>
      <ul className={s.boxMonthAdd}>
        <li>
          <p>Месяц</p>
        </li>
        <li>
          <button type="button" className={s.addButton}>
            <span className={s.plusAdd}>
              <FaPlus size={10} />
            </span>{" "}
            Добавить измерение
          </button>
        </li>
      </ul>
      <ul></ul>
    </>
  );
}
