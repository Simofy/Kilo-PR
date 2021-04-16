import React, { useState, useEffect } from "react";
import {
  XAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer,
  AreaChart,
  YAxis,
} from "recharts";
import styled from "styled-components";

interface IData {
  date: any;
  value: number;
}

interface IChartWrapper {
  displayStatus: boolean;
}

const url = `https://api.covid19api.com/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`;
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
  padding: 2rem 0;
  box-shadow: 1rem 1rem 4rem 2rem #fff;
  display: ${(displayStatus) => (displayStatus ? "block" : "none")};
  z-index: 2;
`;

export const ReChart = (): JSX.Element => {
  const [chartData, setChartData] = useState<IData[]>();

  const [chartActive, setChartActive] = useState(false);

  const generateData = () => {
    const data: IData[] = [];
    for (let i = 0; i < 20; i++) {
      const date = new Date().getDate().toFixed(2);
      const value = 1 + Math.random();
      data.push({
        date,
        value,
      });
    }
    setChartData(data);
  };

  const fetchCovidData = async () => {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
  };

  useEffect(() => {
    generateData();
    fetchCovidData();
  }, []);

  return (
    <ChartWrapper displayStatus={!chartActive}>
      <ResponsiveContainer minWidth={500} height={400}>
        <AreaChart data={chartData && chartData}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451b7" strokeOpacity={0.4} />
              <stop offset="75%" stopColor="#2451b7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke="#2451b7" fill="url(#color)" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            tickCount={8}
          />
          <Tooltip />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
