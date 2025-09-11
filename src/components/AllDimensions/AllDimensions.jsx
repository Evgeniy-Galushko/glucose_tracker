import { NavLink } from "react-router-dom";
import sprite from "../../img/icon-sprite.svg";
import s from "./AllDimensions.module.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllSugar,
  selectIsLoadingAllSugar,
} from "../../redux/measuring/selectors.js";
import { allSugarRequest } from "../../redux/measuring/operations.js";
import SugarNorm from "../../utils/sugarNorm.js";
import { selectUser } from "../../redux/auth/selectors.js";
import clsx from "clsx";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import LoaderSmall from "../LoaderSmall/LoaderSmall.jsx";

export default function AllDimensions() {
  const answerAllDimensions = useSelector(selectAllSugar);
  const userInformation = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoadingAllSugar);
  const { age } = userInformation;
  const dispatch = useDispatch();
  const printRef = useRef();

  useEffect(() => {
    dispatch(allSugarRequest());
  }, [dispatch]);

  if (!answerAllDimensions) return null;

  const allDimensions = answerAllDimensions.toSorted((startDate, endDate) => {
    return (
      new Date(`${endDate.date}T${endDate.time}:00`) -
      new Date(`${startDate.date}T${startDate.time}:00`)
    );
  });

  // if (!allDimensions) return;

  // const handleClickPrint = () => {
  //   window.print();
  // };

  const exportToExcel = () => {
    const data = allDimensions.map(
      ({ date, time, measurementTime, onAnEmptyStomach, afterEating }) => ({
        Дата: date,
        Время: time,
        "Уровень сахара": afterEating ?? onAnEmptyStomach ?? 0,
        "Время измерения": measurementTime,
      })
    );

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Сахар");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Уровень_сахара.xlsx");
  };

  return (
    <section className={s.sectionAllDimensions}>
      <ul className={s.allDimensions}>
        <li className={s.boxLink}>
          <button onClick={exportToExcel} className={s.downloadButton}>
            Скачать в Excel
          </button>
        </li>
        <li className={s.loaderAndTable}>
          {isLoading ? (
            <LoaderSmall />
          ) : allDimensions.length === 0 ? (
            <p className={s.paragraph}>Нет данных</p>
          ) : (
            <div ref={printRef} className={s.boxTable}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th className={s.titleLine}>Дата</th>
                    <th className={s.titleLine}>Время</th>
                    <th className={s.titleLine}>Уровень сахара</th>
                    <th className={s.titleLine}>Время измерения</th>
                    <th className={s.titleLine}>Норма</th>
                  </tr>
                </thead>
                <tbody>
                  {allDimensions.map(
                    (
                      {
                        date,
                        measurementTime,
                        onAnEmptyStomach,
                        afterEating,
                        time,
                        _id,
                      },
                      index
                    ) => {
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
                        <tr key={_id} className={s.tableRow}>
                          <td className={clsx(s.tableRows, s.widthDate)}>
                            {date}
                          </td>
                          <td className={clsx(s.tableRows, s.widthTime)}>
                            {time}
                          </td>
                          <td className={clsx(s.tableRows, s.widthLevel)}>
                            {afterEating ?? onAnEmptyStomach ?? 0}
                          </td>
                          <td
                            className={clsx(
                              s.tableRows,
                              s.widthMeasurementTime
                            )}
                          >
                            {measurementTime}
                          </td>
                          <td className={clsx(s.tableRows, s.widthNorm)}>
                            {(afterEating ?? onAnEmptyStomach ?? 0) <
                              minSugar && (
                              <svg
                                width={18}
                                height={18}
                                style={{ rotate: "180deg" }}
                              >
                                <use href={`${sprite}#icon-arrow-blue`} />
                              </svg>
                            )}
                            {(afterEating ?? onAnEmptyStomach ?? 0) >=
                              minSugar &&
                              (afterEating ?? onAnEmptyStomach ?? 0) <=
                                maxSugar && (
                                <svg width={18} height={18}>
                                  <use href={`${sprite}#icon-green-circle`} />
                                </svg>
                              )}
                            {(afterEating ?? onAnEmptyStomach ?? 0) >
                              maxSugar && (
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
            </div>
          )}
        </li>
      </ul>
    </section>
  );
}
