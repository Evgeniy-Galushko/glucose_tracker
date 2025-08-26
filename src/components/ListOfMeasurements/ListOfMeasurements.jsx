import s from "./ListOfMeasurements.module.css";
import sprite from "../../img/icon-sprite.svg";
import { selectUser } from "../../redux/auth/selectors.js";
import { useSelector } from "react-redux";
import { useState } from "react";
import SugarNorm from "../../utils/sugarNorm.js";

export default function ListOfMeasurements({
  oneDay,
  setModalMeasurement,
  setIdDelete,
}) {
  // const [minSugar, setMinSugar] = useState(0);
  // const [maxSugar, setMaxSugar] = useState(0);
  // const [afterEatingSugar, setAfterEatingSugar] = useState(0);

  const userInformation = useSelector(selectUser);
  const { name, weight, height, bloodSugarNorm, age } = userInformation;
  if (!oneDay) return;

  console.log(age);

  const handleOpenModalDelete = (id) => {
    setModalMeasurement(true);
    setIdDelete(id);
  };

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const tecDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  // console.log(tecDate !== oneDay[0].date);
  // console.log();
  return (
    <>
      {oneDay.map(
        ({
          onAnEmptyStomach,
          afterEating,
          date,
          measurementTime,
          time,
          _id,
        }) => {
          const minSugar = SugarNorm(measurementTime, age).minSugar;
          const maxSugar = SugarNorm(measurementTime, age).maxSugar;
          const afterEatingSugar = SugarNorm(
            measurementTime,
            age
          ).afterEatingSugar;

          console.log(minSugar, maxSugar, afterEatingSugar);

          return (
            <li key={_id} className={s.oneCart}>
              <ul className={s.boxOneCart}>
                <li>
                  <svg width={48} height={48}>
                    <use href={`${sprite}#icon-drop-of-blood`} />
                  </svg>
                </li>
                <li>
                  <ul className={s.boxIndicators}>
                    <li>
                      <p className={s.sugarLevel}>
                        {afterEating ?? onAnEmptyStomach ?? 0} ммоль/л
                      </p>
                    </li>
                    <li>
                      <p className={s.sugarLevel}>{measurementTime}</p>
                    </li>
                    <li className={s.boxTime}>
                      <p className={s.time}>{time}</p>
                      <svg width={24} height={24}>
                        <use href={`${sprite}#icon-time-complexity`} />
                      </svg>
                    </li>
                  </ul>
                </li>
                <li className={s.boxButtonSvg}>
                  {(afterEating ?? onAnEmptyStomach ?? 0) >= minSugar &&
                    (afterEating ?? onAnEmptyStomach ?? 0) <= maxSugar && (
                      <svg width={18} height={18}>
                        <use href={`${sprite}#icon-green-circle-svgrepo-com`} />
                      </svg>
                    )}
                  {(afterEating ?? onAnEmptyStomach ?? 0) >= minSugar &&
                    (afterEating ?? onAnEmptyStomach ?? 0) <= maxSugar && (
                      <svg width={18} height={18} style={{ rotate: "0deg" }}>
                        <use href={`${sprite}#icon-arrow-next`} />
                      </svg>
                    )}
                  {(afterEating ?? onAnEmptyStomach ?? 0) >= minSugar &&
                    (afterEating ?? onAnEmptyStomach ?? 0) <= maxSugar && (
                      <svg width={18} height={18} style={{ rotate: "180deg" }}>
                        <use href={`${sprite}#icon-arrow-direction`} />
                      </svg>
                    )}

                  <button
                    disabled={tecDate !== date}
                    type="button"
                    className={s.buttonDelete}
                    onClick={() => {
                      handleOpenModalDelete(_id);
                    }}
                  >
                    <svg
                      className={tecDate !== date ? s.iconDisabled : s.icon}
                      width={24}
                      height={24}
                    >
                      <use href={`${sprite}#icon-basket`} />
                    </svg>
                  </button>
                </li>
              </ul>
            </li>
          );
        }
      )}
    </>
  );
}
