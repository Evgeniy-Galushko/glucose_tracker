import { useDispatch, useSelector } from "react-redux";
import s from "./DetailedInfo.module.css";
import { signoutRequest } from "../../redux/auth/operations.js";
import { selectToken } from "../../redux/auth/selectors.js";
import { useNavigate } from "react-router-dom";

export default function DetailedInfo() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  if (!token) {
    navigate("/");
  }

  // console.log(token);
  const handleLogOut = () => {
    dispatch(signoutRequest());
  };

  return (
    <button type="button" onClick={handleLogOut}>
      Log out
    </button>
  );
}
