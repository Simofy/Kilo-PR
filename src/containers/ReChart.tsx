import React, { useState } from "react";
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
import { BsChevronDown } from "react-icons/bs";
import { NoResultsContainer } from "../components/wrappers/NoResultsContainer";
import { ChartWrapper } from "../components/wrappers/ChartWrapper";
import { CloseChartWrapper } from "../components/wrappers/CloseChartWrapper";
import { VaccineChart } from "./VaccinesChart";

export const ReChart = (): JSX.Element => {
  const chartData: any = useAppSelector(
    (state) => state.chartData.countriesInfo
  );

  const [chartActive, setChartActive] = useState<boolean>(true);

  if (!chartData.length || chartData == null)
    return (
      <NoResultsContainer>
        <h4>No results on this location, unfortunately.</h4>
      </NoResultsContainer>
    );

  return (
    <ChartWrapper display={chartActive ? true : false}>
      <CloseChartWrapper onClick={() => setChartActive(false)}>
        <BsChevronDown size={30} color="#fff" />
      </CloseChartWrapper>
      <ResponsiveContainer minWidth={500} height={125}>
        <LineChart data={chartData && chartData}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451b7" strokeOpacity={0.4} />
              <stop offset="75%" stopColor="#2451b7" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area dataKey="Confirmed" stroke="#2451b7" fill="url(#color)" />
          <XAxis dataKey="Date" axisLine={false} tickLine={false} />
          <YAxis
            dataKey="Confirmed"
            axisLine={false}
            tickLine={false}
            tickCount={10}
          />
          <Tooltip />
          <CartesianGrid opacity={0.1} vertical={false} />
          <Line
            type="monotone"
            dataKey="Confirmed"
            stroke="#2451b7"
            fill="url(#color)"
          />
          <Line
            type="monotone"
            dataKey="Active"
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
