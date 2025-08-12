import { ErrorMessage, Field, Form, Formik } from "formik";
import Logo from "../Logo/Logo.jsx";
import s from "./SignInForm.module.css";
import { useId, useState } from "react";
import DisplayPasswordSecond from "../DisplayPasswordSecond/DisplayPasswordSecond.jsx";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { clsx } from "clsx";

export default function SignInForm() {
  const [displayPassword, setDisplayPassword] = useState(false);

  const emailId = useId();
  const passwordId = useId();

  const format = {
    email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    // password:
    //   /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{7,}/,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(format.email, "Email is incorrect!")
      .required("Enter a valid Email"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, action) => {
    console.log(values);

    action.resetForm();
  };

  return (
    <>
      <Logo />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <h1 className={s.titleForm}>Войти</h1>
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
            LogIn
          </button>
          <p className={s.paragraph}>
            Нет аккаунта?{" "}
            <NavLink className={s.link} to="/signup">
              Зарегистрируйтесь!
            </NavLink>
          </p>
        </Form>
      </Formik>
    </>
  );
}
