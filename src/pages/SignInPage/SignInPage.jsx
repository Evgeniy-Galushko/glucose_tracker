import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import s from "./SignInPage.module.css";

export default function SignInPage() {
  return (
    <section className={s.signInPage}>
      <ul className={s.boxSignInPage}>
        <li className={s.boxForm}>
          <SignInForm />
        </li>
        <li className={s.boxImg}>
          <picture>
            <source
              srcSet="/homeImg_PC.png 1x, /homeImg_PC_2x.png 2x"
              media="(max-width: 767px)"
            />
            <img
              src="/homeImg_PC.png"
              alt="with sugar and glucometer"
              className={s.backgroundImage}
            />
          </picture>
        </li>
      </ul>
    </section>
  );
}
