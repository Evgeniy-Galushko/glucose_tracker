import { NavLink } from "react-router-dom";
import s from "./Logo.module.css";

export default function Logo() {
  return (
    <NavLink to="/" className={s.logo}>
      <img src="/public/logo.png" alt="logo" />
      Трекер Глюкозы
    </NavLink>
  );
}
