import { useEffect, useState } from "react";
import s from "./Calendar.module.css";
import { CgChevronLeft } from "react-icons/cg";
import { CgChevronRight } from "react-icons/cg";
import clsx from "clsx";

export default function Calendar({
  setSelectedDay,
  setSelectedMonth,
  setChartTitle,
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
  const [currentВate, setCurrentDate] = useState(new Date().getDate());
  const [daysOfWeek, setDaysOfWeek] = useState();

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
    // const dayWeek = [];
    // for (let i = 1; i <= deyAndWeek - 1; i++) {
    //   dayWeek.push(i);
    // }
    // setDaysOfWeek(dayWeek);

    setNumberOfDaysInAMonth(days);
    setSelectedMonth(`${year}-${number.toString().padStart(2, "0")}`);
    setChartTitle(
      dayOfMonth.length === 0
        ? dayTitle + " " + month
        : dayOfMonth.slice(8, 10) + " " + month
    );
  }, [number, year, setSelectedMonth, setChartTitle, dayOfMonth]);

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
      {/* <ul className={s.daysOfTheWeek}>
        <li>пн</li>
        <li>вт</li>
        <li>ср</li>
        <li>чт</li>
        <li>пт</li>
        <li>сб</li>
        <li>вс</li>
      </ul> */}
      <ul className={s.calendar}>
        {/* {daysOfWeek.length === 0
          ? [1, 2, 3, 4, 5, 6].map((ob, index) => {
              return <li className={s.emptyRing} key={index}></li>;
            })
          : daysOfWeek.map((ob, index) => {
              return <li className={s.emptyRing} key={index}></li>;
            })} */}
        {numberOfDaysInAMonth.map((day, index) => {
          // console.log(
          //   `${years}-${months.toString().padStart(2, "0")}-${day
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
                  `${years}-${number.toString().padStart(2, "0")}-${day
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

// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
//   <LineChart
//   width={600}
//   height={300}
//   data={masiv}
//   margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
// >
//   <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//   <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//   <XAxis dataKey="name" />
//   <YAxis />
//   <Tooltip />
// </LineChart>;

//  const dater = useSelector(selectActiveDate);
//  const month = useSelector(selectMonth);
//  console.log(month);

//  function converter(dat) {
//    const day = dat.toISOString().split("T")[0];
//    const days = new Date(day);
//    const firstDay = days.getTime() - 24 * 60 * 60 * 1000;
//    const secondDay = days.getTime() - 24 * 2 * 60 * 60 * 1000;
//    const thirdDay = days.getTime() - 24 * 3 * 60 * 60 * 1000;
//    const fourthDay = days.getTime() - 24 * 4 * 60 * 60 * 1000;
//    const fifthDay = days.getTime() - 24 * 5 * 60 * 60 * 1000;
//    const sixthDay = days.getTime() - 24 * 6 * 60 * 60 * 1000;
//    return [
//      { name: new Date(sixthDay).getDate(), uv: 5000 },
//      { name: new Date(fifthDay).getDate(), uv: 2500 },
//      { name: new Date(fourthDay).getDate(), uv: 3000 },
//      { name: new Date(thirdDay).getDate(), uv: 2000 },
//      { name: new Date(secondDay).getDate(), uv: 2000 },
//      { name: new Date(firstDay).getDate(), uv: 2400 },
//      { name: new Date(day).getDate(), uv: 3000 },
//    ];
//  }

//  const masiv = converter(new Date(dater));
//  console.log(masiv);
