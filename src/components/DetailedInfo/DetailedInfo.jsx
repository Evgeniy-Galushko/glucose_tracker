import { useDispatch, useSelector } from "react-redux";
import s from "./DetailedInfo.module.css";
import { signoutRequest } from "../../redux/auth/operations.js";
import { selectToken, selectUser } from "../../redux/auth/selectors.js";
import { useNavigate } from "react-router-dom";
import { BsGear } from "react-icons/bs";
import sprite from "../../img/icon-sprite.svg";
import { useEffect } from "react";

export default function DetailedInfo() {
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

  return (
    <>
      <h2>Привет, {user.name}</h2>
      <ul>
        <li>
          <button type="button">
            <BsGear size={16} /> Параметр
          </button>
        </li>
        <li>
          <button type="button" onClick={handleLogOut}>
            Выход
          </button>
        </li>
      </ul>
      <button type="button">
        <span>+</span> Добавить измерение
      </button>
    </>
  );
}
