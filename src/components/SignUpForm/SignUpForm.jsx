import { ErrorMessage, Field, Form, Formik } from "formik";
import Logo from "../Logo/Logo.jsx";
import s from "./SignUpForm.module.css";
import { useEffect, useId, useState } from "react";
import DisplayPasswordSecond from "../DisplayPasswordSecond/DisplayPasswordSecond.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { clsx } from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { registrationRequest } from "../../redux/auth/operations.js";
import { selectToken } from "../../redux/auth/selectors.js";
import { errorReset } from "../../redux/measuring/slice.js";

export default function SignUpForm() {
  const [displayPassword, setDisplayPassword] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const format = {
    name: /^[а-яА-Яa-zA-Z0-9 ]{3,50}$/,
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    // password:
    //   /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{7,}/,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(format.name, "Name is incorrect!")
      .required("Required"),
    email: Yup.string()
      .matches(format.email, "Email is incorrect!")
      .required("Enter a valid Email"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, action) => {
    dispatch(errorReset());
    dispatch(registrationRequest(values));

    action.resetForm();
  };

  useEffect(() => {
    if (token) {
      navigate("/tracker");
    }
  }, [navigate, token]);

  return (
    <>
      <Logo />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <h1 className={s.titleForm}>Регистрация</h1>
          <div className={s.boxInput}>
            <label htmlFor={nameId} className={s.label}>
              Имя
            </label>
            <Field
              className={s.input}
              id={nameId}
              name="name"
              type="text"
              placeholder="Введите свое имя"
              required
            />
            <ErrorMessage
              className={s.errorMessage}
              name="name"
              component="span"
            />
          </div>
          <div className={s.boxInput}>
            <label htmlFor={emailId} className={s.label}>
              Email
            </label>
            <Field
              className={s.input}
              id={emailId}
              name="email"
              type="email"
              placeholder="Введите свой email"
              required
            />
            <ErrorMessage
              className={s.errorMessage}
              name="email"
              component="span"
            />
          </div>
          <div className={s.boxInput}>
            <label htmlFor={passwordId} className={s.label}>
              Пароль
            </label>
            <Field
              className={clsx(s.input, s.inputPassword)}
              id={passwordId}
              name="password"
              type={displayPassword ? "text" : "password"}
              placeholder="Введите ваш пароль"
              required
            />
            <label htmlFor={passwordId} className={s.labelPassword}>
              <DisplayPasswordSecond
                displayPassword={displayPassword}
                setDisplayPassword={setDisplayPassword}
              />
            </label>
            <ErrorMessage
              className={s.errorMessage}
              name="password"
              component="span"
            />
          </div>
          <button className={s.buttonSubmit} type="submit">
            Registration
          </button>
          <p className={s.paragraph}>
            Уже есть аккаунт?{" "}
            <NavLink className={s.link} to="/signin">
              Войти!
            </NavLink>
          </p>
        </Form>
      </Formik>
    </>
  );
}
