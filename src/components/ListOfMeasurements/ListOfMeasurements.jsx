import s from "./ListOfMeasurements.module.css";
import sprite from "../../img/icon-sprite.svg";

export default function ListOfMeasurements({
  oneDay,
  setModalMeasurement,
  setIdDelete,
}) {
  if (!oneDay) return;

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
                        <svg width={18} height={18}>
                          <use
                            href={`${sprite}#icon-green-circle-svgrepo-com`}
                          />
                        </svg>
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
                <li>
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
