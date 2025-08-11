import { NavLink } from "react-router-dom";
import s from "./Logo.module.css";

export default function Logo() {
  return (
    <NavLink to="/" className={s.logo}>
      <img src="/logo.svg" alt="logo" />
      Трекер Глюкозы
    </NavLink>
  );
}
