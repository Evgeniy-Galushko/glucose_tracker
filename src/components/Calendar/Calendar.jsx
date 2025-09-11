import { useEffect, useState } from "react";
import s from "./Calendar.module.css";
import { CgChevronLeft } from "react-icons/cg";
import { CgChevronRight } from "react-icons/cg";
import clsx from "clsx";

export default function Calendar({
  setSelectedDay,
  setSelectedMonth,
  // setChartTitle,
}) {
  const [numberOfDaysInAMonth, setNumberOfDaysInAMonth] = useState(() => {
    const day = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();

    const days = [];
    for (let i = 1; i <= day; i++) {
      days.push(i);
    }

    return days;
  });
  const [month, setMonth] = useState("");
  const [number, setNumber] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [dayOfMonth, setDayOfMonth] = useState("");
  // const [currentВate, setCurrentDate] = useState(new Date().getDate());
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  const years = new Date().getFullYear();
  const months = new Date().getMonth() + 1;
  const dayTitle = new Date().getDate();

  // console.log(`${year}-${number.toString().padStart(2, "0")}`);

  // console.log(new Date().getDay());

  useEffect(() => {
    switch (number) {
      case 1:
        // setMonth("January");
        setMonth("Январь");
        break;
      case 2:
        // setMonth("February");
        setMonth("Февраль");
        break;
      case 3:
        // setMonth("March");
        setMonth("Март");
        break;
      case 4:
        // setMonth("April");
        setMonth("Апрель");
        break;
      case 5:
        // setMonth("May");
        setMonth("Май");
        break;
      case 6:
        // setMonth("June");
        setMonth("Июнь");
        break;
      case 7:
        // setMonth("July");
        setMonth("Июль");
        break;
      case 8:
        // setMonth("August");
        setMonth("Август");
        break;
      case 9:
        // setMonth("September");
        setMonth("Сентябрь");
        break;
      case 10:
        // setMonth("October");
        setMonth("Октябрь");
        break;
      case 11:
        // setMonth("November");
        setMonth("Ноябрь");
        break;
      case 12:
        // setMonth("December");
        setMonth("Декабрь");
        break;
    }

    const numberOfDays = new Date(year, number, 0).getDate();
    const days = [];
    for (let i = 1; i <= numberOfDays; i++) {
      days.push(i);
    }

    // const deyAndWeek = new Date(year, number - 1, 1).getDay();

    function array(number) {
      switch (number) {
        case 1:
          setDaysOfWeek([]);
          break;
        case 2:
          setDaysOfWeek([1]);
          break;
        case 3:
          setDaysOfWeek([1, 2]);
          break;
        case 4:
          setDaysOfWeek([1, 2, 3]);
          break;
        case 5:
          setDaysOfWeek([1, 2, 3, 4]);
          break;
        case 6:
          setDaysOfWeek([1, 2, 3, 4, 5]);
          break;
        case 0:
          setDaysOfWeek([1, 2, 3, 4, 5, 6]);
          break;
      }
    }
    // const dayWeek = [];
    // for (let i = 1; i <= deyAndWeek - 1; i++) {
    //   dayWeek.push(i);
    // }
    // setDaysOfWeek(dayWeek);

    array(new Date(year, number - 1, 1).getDay());

    setNumberOfDaysInAMonth(days);
    setSelectedMonth(`${year}-${number.toString().padStart(2, "0")}`);
    // setChartTitle(
    //   dayOfMonth.length === 0
    //     ? dayTitle + " " + month
    //     : dayOfMonth.slice(8, 10) + " " + month
    // );
  }, [number, year, setSelectedMonth, dayOfMonth]);

  const handleClickDay = (e) => {
    const form = e.target.innerText;
    setDayOfMonth(
      `${year}-${number.toString().padStart(2, "0")}-${form
        .toString()
        .padStart(2, "0")}`
    );
    setSelectedDay(
      `${year}-${number.toString().padStart(2, "0")}-${form
        .toString()
        .padStart(2, "0")}`
    );
  };

  const handleClickForward = () => {
    if (number >= 1) {
      setNumber(number + 1);
    }
    if (number === 12) {
      setNumber(1);
      setYear(year + 1);
    }
  };

  const handleClickBack = () => {
    if (number >= 2) {
      setNumber(number - 1);
    }
    if (number === 1) {
      setNumber(12);
      setYear(year - 1);
    }
  };

  // console.log(daysOfWeek);

  return (
    <div className={s.boxCalendar}>
      <ul className={s.titleCalendar}>
        <li>
          <h3 className={s.titleMonth}>
            {dayOfMonth.length === 0
              ? dayTitle + " " + month
              : dayOfMonth.slice(8, 10) + " " + month}
          </h3>
        </li>
        <li className={s.boxButton}>
          <button className={s.buttonArrows} onClick={handleClickBack}>
            <CgChevronLeft size={18} />
          </button>
          <p className={s.monthYear}>
            {month} {year}
          </p>
          {/* <p></p> */}
          <button className={s.buttonArrows} onClick={handleClickForward}>
            <CgChevronRight size={18} />
          </button>
        </li>
      </ul>
      <ul className={s.daysOfTheWeek}>
        <li>
          <p className={s.dayWeek}>пн</p>
        </li>
        <li>
          <p className={s.dayWeek}>вт</p>
        </li>
        <li>
          <p className={s.dayWeek}>ср</p>
        </li>
        <li>
          <p className={s.dayWeek}>чт</p>
        </li>
        <li>
          <p className={s.dayWeek}>пт</p>
        </li>
        <li>
          <p className={s.dayWeek}>сб</p>
        </li>
        <li>
          <p className={s.dayWeek}>вс</p>
        </li>
      </ul>
      <ul className={s.calendar}>
        {daysOfWeek.map((ob, index) => {
          return <li className={s.emptyRing} key={index}></li>;
        })}
        {numberOfDaysInAMonth.map((day, index) => {
          // console.log(
          //   `${years}-${number.toString().padStart(2, "0")}-${day
          //     .toString()
          //     .padStart(2, "0")}`
          // );
          // console.log(
          //   `${years}-${months.toString().padStart(2, "0")}-${dayTitle
          //     .toString()
          //     .padStart(2, "0")}`
          // );
          return (
            <li key={index}>
              <button
                className={clsx(
                  s.buttonCalend,
                  `${years}-${number.toString().padStart(2, "0")}-${day
                    .toString()
                    .padStart(2, "0")}` ===
                    `${years}-${months.toString().padStart(2, "0")}-${dayTitle
                      .toString()
                      .padStart(2, "0")}` && s.currentDay
                )}
                onClick={handleClickDay}
                disabled={
                  `${year}-${number.toString().padStart(2, "0")}-${day
                    .toString()
                    .padStart(2, "0")}` >
                  `${years}-${months.toString().padStart(2, "0")}-${dayTitle
                    .toString()
                    .padStart(2, "0")}`
                }
              >
                {day}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
