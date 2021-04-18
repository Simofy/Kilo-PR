import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  XAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer,
  LineChart,
  YAxis,
  Line,
} from "recharts";
import styled from "styled-components";

interface IChartWrapper {
  displayStatus: boolean;
}

const ChartWrapper = styled.div<IChartWrapper>`
  width: 100vw;
  min-height: 30vh;
  position: absolute;
  bottom: 0;
  background: rgb(246, 245, 240);
  background: linear-gradient(
    180deg,
    rgba(246, 245, 240, 0.3617822128851541) 0%,
    rgba(21, 21, 21, 0.7035189075630253) 0%,
    rgba(21, 21, 21, 1) 100%
  );
  padding: 2rem;
  box-shadow: 0rem 0rem 15em 0.2em #fff;
  display: ${(displayStatus) => (displayStatus ? "block" : "none")};
  z-index: 2;
  display: none !important;
`;

export const ReChart = (): JSX.Element => {
  const chartData = useSelector((state: any) => state.covidData.data);

  const [chartActive] = useState(false);

  return (
    <ChartWrapper displayStatus={chartActive}>
      <ResponsiveContainer minWidth={500} height={300}>
        <LineChart data={chartData && chartData}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451b7" strokeOpacity={0.4} />
              <stop offset="75%" stopColor="#2451b7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="Confirmed" stroke="#2451b7" fill="url(#color)" />
          <XAxis dataKey="dateString" axisLine={false} tickLine={false} />
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
          <Line type="monotone" dataKey="Deaths" stroke="#d12b28" />
          <Line
            type="monotone"
            dataKey="Active"
            stroke="#2451b7"
            fill="url(#color)"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
