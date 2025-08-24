import { useDispatch, useSelector } from "react-redux";
import s from "./MeasurementSchedule.module.css";
import { useEffect, useState } from "react";
import { oneDayRequest } from "../../redux/measuring/operations.js";
import {
  selectOneDay,
  selectOneMonth,
} from "../../redux/measuring/selectors.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Bar,
  BarChart,
  Rectangle,
} from "recharts";

export default function MeasurementSchedule({
  screenSize,
  graphHeights,
  selectedDay,
  chartTitle,
}) {
  const oneDay = useSelector(selectOneDay);
  const oneMonth = useSelector(selectOneMonth);

  return (
    <ul className={s.boxGraph}>
      <li>
        <h2 className={s.title}>За один выбранный день </h2>
        {/* <ResponsiveContainer width={500} height={300}>
          <LineChart
            width={500}
            height={300}
            data={oneDay}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis ticks={[2, 4, 6, 8, 10, 12, 14, 16]} />
            <Tooltip />
            <Legend />
            <Line
              name="натощак"
              // legendType="none"
              type="monotone"
              dataKey="onAnEmptyStomach"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              name="после еды"
              type="monotone"
              dataKey="afterEating"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer> */}
        {oneDay.length === 0 ? (
          <p>За выбранный ден нет данных</p>
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
            <XAxis dataKey="time" />
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
              // stackId="после еды"
              name="после еды"
              type="monotone"
              dataKey="afterEating"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        )}

        {/* <ResponsiveContainer width={343} height={200}>
          <BarChart
            width={screenSize}
            height={graphHeights}
            data={oneDay}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              name="натощак"
              dataKey="onAnEmptyStomach"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              name="после еды"
              dataKey="afterEating"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer> */}
      </li>
      <li>
        <h2 className={s.title}>За выбранный месяц</h2>
        {oneMonth.length === 0 ? (
          <p>За выбранный месяц нет данных </p>
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
              dataKey="afterEating"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              dot={{ stroke: "#5a8269ff", strokeWidth: 1, r: 5 }}
              // stackId="после еды"
              name="после еды"
              type="monotone"
              dataKey="onAnEmptyStomach"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        )}
      </li>
    </ul>
  );
}
