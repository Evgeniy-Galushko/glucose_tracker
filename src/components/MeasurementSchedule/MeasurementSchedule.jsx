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
  AreaChart,
  Area,
  Bar,
  BarChart,
  Rectangle,
} from "recharts";

export default function MeasurementSchedule() {
  const dispatch = useDispatch();
  const oneDay = useSelector(selectOneDay);

  if (oneDay) {
    console.log(oneDay);
  }

  const arry = [
    {
      createdAt: "2025-08-13T14:01:40.107Z",
      date: "2025-08-13",
      measurementTime: "натощак",
      sugarLevel: 8,
      time: "08.00",
      updatedAt: "2025-08-13T14:01:40.107Z",
      userId: "6890b0ab055da8d96cf33186",
      _id: "689c9ac40de983654e9703bb",
    },
    {
      createdAt: "2025-08-13T14:01:40.107Z",
      date: "2025-08-13",
      measurementTime: "после еды",
      sugarLevel: 5,
      time: "10.00",
      updatedAt: "2025-08-13T14:01:40.107Z",
      userId: "6890b0ab055da8d96cf33186",
      _id: "689c9ac40de983654e9703bb",
    },
    {
      createdAt: "2025-08-13T14:01:40.107Z",
      date: "2025-08-13",
      measurementTime: "натощак",
      sugarLevel: 7,
      time: "12.00",
      updatedAt: "2025-08-13T14:01:40.107Z",
      userId: "6890b0ab055da8d96cf33186",
      _id: "689c9ac40de983654e9703bb",
    },
    {
      createdAt: "2025-08-13T14:01:40.107Z",
      date: "2025-08-13",
      measurementTime: "после еды",
      sugarLevel: 10,
      time: "14.00",
      updatedAt: "2025-08-13T14:01:40.107Z",
      userId: "6890b0ab055da8d96cf33186",
      _id: "689c9ac40de983654e9703bb",
    },
  ];

  const onAnEmptyStomach = [
    {
      date: "2025-08-13",
      onAnEmptyStomach: 7,
      time: "12.00",
    },
    {
      date: "2025-08-13",
      onAnEmptyStomach: 8,
      time: "08.00",
    },
    {
      date: "2025-08-13",
      afterEating: 5,
      time: "10.00",
    },
    {
      date: "2025-08-13",
      afterEating: 10,
      time: "14.00",
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
      </ResponsiveContainer>

      <AreaChart
        width={530}
        height={300}
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
          name="натощак"
          type="monotone"
          dataKey="onAnEmptyStomach"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          name="после еды"
          type="monotone"
          dataKey="afterEating"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>

      <ResponsiveContainer width={500} height={300}>
        <BarChart
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
      </ResponsiveContainer>
    </>
  );
}
