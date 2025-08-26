import { useSelector } from "react-redux";
import s from "./MeasurementSchedule.module.css";
import {
  selectOneDay,
  selectOneMonth,
} from "../../redux/measuring/selectors.js";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  Legend,
  Line,
  LineChart,
} from "recharts";

export default function MeasurementSchedule({ screenSize, graphHeights }) {
  const oneDay = useSelector(selectOneDay);
  const oneMonth = useSelector(selectOneMonth);

  return (
    <ul className={s.boxGraph}>
      <li>
        <h2 className={s.title}>За один выбранный день </h2>
        {oneDay.length === 0 ? (
          <p className={s.titleStub}>За выбранный ден нет данных</p>
        ) : (
          <AreaChart
            width={screenSize}
            height={graphHeights}
            data={oneDay}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" padding={{ left: 15 }} />
            <YAxis ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              label={({ x, y, value }) => (
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  fill="#706cb0ff"
                  fontSize={20}
                >
                  {value}
                </text>
              )}
              dot={{ stroke: "#524f84ff", strokeWidth: 1, r: 5 }}
              name="натощак"
              type="monotone"
              dataKey="onAnEmptyStomach"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              dot={{ stroke: "#5a8269ff", strokeWidth: 1, r: 5 }}
              name="после еды"
              type="monotone"
              dataKey="afterEating"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
              label={({ x, y, value }) => (
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  fill="#74ac8aff"
                  fontSize={20}
                >
                  {value}
                </text>
              )}
            />
          </AreaChart>
        )}
        <ul className={s.description}>
          <li className={s.oneDescription}>
            <span className={s.emptyStomach}></span>
            <p className={s.descriptionTitle}>натощак</p>
          </li>
          <li className={s.oneDescription}>
            <span className={s.afterEating}></span>
            <p className={s.descriptionTitle}>после еды</p>
          </li>
        </ul>
      </li>
      <li>
        <h2 className={s.title}>За выбранный месяц</h2>
        {oneMonth.length === 0 ? (
          <p className={s.titleStub}>За выбранный месяц нет данных </p>
        ) : (
          <AreaChart
            width={screenSize}
            height={graphHeights}
            data={oneMonth}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            <YAxis ticks={[2, 4, 6, 8, 10, 12, 14, 16]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              dot={{ stroke: "#524f84ff", strokeWidth: 1, r: 5 }}
              name="натощак"
              type="monotone"
              dataKey="onAnEmptyStomach"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              dot={{ stroke: "#5a8269ff", strokeWidth: 1, r: 5 }}
              name="после еды"
              type="monotone"
              dataKey="afterEating"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        )}
        <ul className={s.description}>
          <li className={s.oneDescription}>
            <span className={s.emptyStomach}></span>
            <p className={s.descriptionTitle}>натощак</p>
          </li>
          <li className={s.oneDescription}>
            <span className={s.afterEating}></span>
            <p className={s.descriptionTitle}>после еды</p>
          </li>
        </ul>
      </li>
    </ul>
  );
}
