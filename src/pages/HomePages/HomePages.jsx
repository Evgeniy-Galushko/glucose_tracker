import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection.jsx";
import s from "./HomePages.module.css";

export default function HomePages() {
  return (
    <section className={s.sectionHome}>
      <ul className={s.homeBox}>
        <li className={s.boxWelcomeSection}>
          <WelcomeSection />
        </li>
        <li className={s.boxImg}>
          <AdvantagesSection />
        </li>
      </ul>
    </section>
  );
}
