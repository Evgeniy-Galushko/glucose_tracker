import { NavLink } from "react-router-dom";
import sprite from "../../img/icon-sprite.svg";
import s from "./AllDimensionsPage.module.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllSugar } from "../../redux/measuring/selectors.js";
import { allSugarRequest } from "../../redux/measuring/operations.js";
import SugarNorm from "../../utils/sugarNorm.js";
import { selectUser } from "../../redux/auth/selectors.js";
import clsx from "clsx";

export default function AllDimensionsPage() {
  const answerAllDimensions = useSelector(selectAllSugar);
  const userInformation = useSelector(selectUser);
  const dispatch = useDispatch();
  const printRef = useRef();

  // if (!allDimensions) return;
  // console.log(!allDimensions);

  useEffect(() => {
    dispatch(allSugarRequest());
  }, [dispatch]);

  const { age } = userInformation;

  if (!answerAllDimensions) return;

  const allDimensions = answerAllDimensions.toSorted((startDate, endDate) => {
    // return endDate.date - startDate.date;
    // console.log(new Date(`${startDate.date}T${startDate.time}:00`));
    return (
      new Date(`${endDate.date}T${endDate.time}:00`) -
      new Date(`${startDate.date}T${startDate.time}:00`)
    );
  });

  const handleClickPrint = () => {
    window.print();
  };
  // console.log(allDimensions);

  return (
    <section className={s.sectionAllDimensions}>
      <ul className={s.allDimensions}>
        <li className={s.boxLink}>
          <NavLink to="/tracker" className={s.link}>
            <svg width={24} height={24}>
              <use href={`${sprite}#icon-arrow-back`} />
            </svg>
            Вернутся обратно
          </NavLink>

          <button onClick={handleClickPrint} type="button">
            Распечатать
          </button>
        </li>
        <li>
          <table className={s.table} ref={printRef}>
            <tbody>
              <tr>
                <th className={s.titleLine}>Дата</th>
                <th className={s.titleLine}>Время</th>
                <th className={s.titleLine}>Уровень сахара</th>
                <th className={s.titleLine}>Время измерения</th>
                <th className={s.titleLine}>Норма</th>
              </tr>
              {allDimensions.map(
                ({
                  date,
                  measurementTime,
                  onAnEmptyStomach,
                  afterEating,
                  time,
                  _id,
                }) => {
                  const minSugar = SugarNorm(measurementTime, age).minSugar;
                  const maxSugar = SugarNorm(measurementTime, age).maxSugar;
                  const afterEatingSugarMin = SugarNorm(
                    measurementTime,
                    age
                  ).afterEatingSugarMin;
                  const afterEatingSugarMax = SugarNorm(
                    measurementTime,
                    age
                  ).afterEatingSugarMax;

                  return (
                    <tr key={_id}>
                      <td className={clsx(s.tableRows, s.widthDate)}>{date}</td>
                      <td className={clsx(s.tableRows, s.widthTime)}>{time}</td>
                      <td className={clsx(s.tableRows, s.widthLevel)}>
                        {afterEating ?? onAnEmptyStomach ?? 0}
                      </td>
                      <td className={clsx(s.tableRows, s.widthMeasurementTime)}>
                        {measurementTime}
                      </td>
                      <td className={clsx(s.tableRows, s.widthNorm)}>
                        {(afterEating ?? onAnEmptyStomach ?? 0) < minSugar && (
                          <svg
                            width={18}
                            height={18}
                            style={{ rotate: "180deg" }}
                          >
                            <use href={`${sprite}#icon-arrow-blue`} />
                          </svg>
                        )}
                        {(afterEating ?? onAnEmptyStomach ?? 0) >= minSugar &&
                          (afterEating ?? onAnEmptyStomach ?? 0) <=
                            maxSugar && (
                            <svg width={18} height={18}>
                              <use href={`${sprite}#icon-green-circle`} />
                            </svg>
                          )}
                        {(afterEating ?? onAnEmptyStomach ?? 0) > maxSugar && (
                          <svg
                            width={18}
                            height={18}
                            style={{ rotate: "0deg" }}
                          >
                            <use href={`${sprite}#icon-arrow-red`} />
                          </svg>
                        )}
                        {(afterEating ?? onAnEmptyStomach ?? 0) <
                          afterEatingSugarMin && (
                          <svg
                            width={18}
                            height={18}
                            style={{ rotate: "180deg" }}
                          >
                            <use href={`${sprite}#icon-arrow-blue`} />
                          </svg>
                        )}
                        {(afterEating ?? onAnEmptyStomach ?? 0) >=
                          afterEatingSugarMin &&
                          (afterEating ?? onAnEmptyStomach ?? 0) <=
                            afterEatingSugarMax && (
                            <svg width={18} height={18}>
                              <use href={`${sprite}#icon-green-circle`} />
                            </svg>
                          )}
                        {(afterEating ?? onAnEmptyStomach ?? 0) >
                          afterEatingSugarMax && (
                          <svg
                            width={18}
                            height={18}
                            style={{ rotate: "0deg" }}
                          >
                            <use href={`${sprite}#icon-arrow-red`} />
                          </svg>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </li>
      </ul>
    </section>
  );
}
