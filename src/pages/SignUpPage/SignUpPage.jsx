import SignUpForm from "../../components/SignUpForm/SignUpForm.jsx";
import s from "./SignUpPage.module.css";

export default function SignUpPage() {
  return (
    <section className={s.signUpPage}>
      <ul className={s.boxSignUpPage}>
        <li className={s.boxForm}>
          <SignUpForm />
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
