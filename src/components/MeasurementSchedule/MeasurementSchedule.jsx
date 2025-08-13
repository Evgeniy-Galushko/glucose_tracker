import { useDispatch, useSelector } from "react-redux";
import s from "./MeasurementSchedule.module.css";
import { useEffect } from "react";
import { oneDayRequest } from "../../redux/measuring/operations.js";
import { selectOneDay } from "../../redux/measuring/selectors.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MeasurementSchedule() {
  const dispatch = useDispatch();
  const oneDay = useSelector(selectOneDay);

  if (oneDay) {
    console.log(oneDay);
  }

  const dat = [
    {
      date: "2025-08-13",
      time: "08.00",
      measurementTime: "натощак",
      sugarLevel: 8,
    },
    {
      date: "2025-08-13",
      time: "12.00",
      measurementTime: "натощак",
      sugarLevel: 7,
    },
    {
      date: "2025-08-13",
      time: "16.00",
      measurementTime: "натощак",
      sugarLevel: 7.5,
    },
  ];

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const day = new Date();

  console.log(day.getDate());
  console.log(day.getMonth() + 1);
  console.log(day.getFullYear());

  useEffect(() => {
    dispatch(oneDayRequest("2025-08-13"));
  }, [dispatch]);

  return (
    <>
      <ResponsiveContainer width={500} height={300}>
        <LineChart
          width={500}
          height={300}
          data={dat}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis ticks={[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sugarLevel"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="после еды" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <h1>grafic</h1>
      {/* <ResponsiveContainer width={500} height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer> */}
    </>
  );
}
