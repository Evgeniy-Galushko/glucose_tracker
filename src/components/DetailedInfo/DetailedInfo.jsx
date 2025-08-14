import { useDispatch, useSelector } from "react-redux";
import s from "./DetailedInfo.module.css";
import { signoutRequest } from "../../redux/auth/operations.js";
import { selectToken, selectUser } from "../../redux/auth/selectors.js";
import { useNavigate } from "react-router-dom";
import sprite from "../../img/icon-sprite.svg";

export default function DetailedInfo() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  if (!token) {
    navigate("/");
  }

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
            <svg className={s.icon} width={16} height={16}>
              <use href={`${sprite}#icon-settings`} />
            </svg>
          </button>
        </li>
        <li>
          <button type="button" onClick={handleLogOut}>
            Выход
          </button>
        </li>
      </ul>
      <button>Добавить измерение</button>
    </>
  );
}
