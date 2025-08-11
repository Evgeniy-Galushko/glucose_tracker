import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import s from "./WelcomeSection.module.css";

export default function WelcomeSection() {
  return (
    <ul className={s.boxWelcomeSection}>
      <li className={s.boxLogo}>
        <Logo />
      </li>
      <li className={s.boxTitle}>
        <p className={s.paragraph}>
          Записывайте ежедневные измерения уровня сахара в крови и отслеживайте
          динамику
        </p>
        <h1 className={s.title}>Трекер уровня сахара в крови</h1>
        <ul className={s.boxLink}>
          <li>
            <NavLink className={s.linkReg} to="/signup">
              Register
            </NavLink>
          </li>
          <li>
            <NavLink className={s.linkLogin} to="/signin">
              Login
            </NavLink>
          </li>
        </ul>
      </li>
    </ul>
  );
}
