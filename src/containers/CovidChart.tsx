import React from "react";
import { useAppSelector } from "../hooks";
import {
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
  Area,
  LineChart,
  YAxis,
  Line,
} from "recharts";
import { NoResultsContainer } from "../components/wrappers/NoResultsContainer";
import { ChartWrapper } from "../components/wrappers/ChartWrapper";
import { VaccineChart } from "./VaccinesChart";

export const CovidChart = (): JSX.Element => {
  const { countriesInfo } = useAppSelector((state) => state.chartData);
  const error = useAppSelector((state) => state.loadingAndError.error);

  console.log(countriesInfo);

  if (error || !countriesInfo.length)
    return (
      <NoResultsContainer>
        No data available on this destination, unfortunately.
      </NoResultsContainer>
    );

  return (
    <ChartWrapper>
      <ResponsiveContainer minWidth={300} height={175}>
        <LineChart data={countriesInfo && countriesInfo}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451b7" strokeOpacity={0.4} />
              <stop offset="75%" stopColor="#2451b7" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area dataKey="Cases" stroke="#2451b7" fill="url(#color)" />
          <XAxis
            dataKey="Date"
            axisLine={false}
            tickLine={false}
            stroke="#fff"
          />
          <YAxis
            dataKey="Cases"
            axisLine={false}
            tickLine={false}
            tickCount={10}
            stroke="#fff"
          />
          <Tooltip />
          <CartesianGrid opacity={0.1} vertical={false} />
          <Line
            type="monotone"
            dataKey="Cases"
            stroke="#2451b7"
            fill="url(#color)"
          />

          <Line type="monotone" dataKey="Recovered" stroke="green" />
          <Line type="monotone" dataKey="Deaths" stroke="#d12b28" />
        </LineChart>
      </ResponsiveContainer>
      <VaccineChart />
    </ChartWrapper>
  );
};
