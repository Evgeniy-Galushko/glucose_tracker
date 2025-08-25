import { useSelector } from "react-redux";
import SignInForm from "../../components/SignInForm/SignInForm.jsx";
import s from "./SignInPage.module.css";
import { selectIsLoadingUser } from "../../redux/auth/selectors.js";
import Loader from "../../components/Loader/Loader.jsx";

export default function SignInPage() {
  const isLoading = useSelector(selectIsLoadingUser);

  return (
    <section className={s.signInPage}>
      {isLoading && <Loader />}
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
