import React, { useState, useEffect } from "react";
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

export const VaccineChart = (): JSX.Element => {
  const vaccineData = useAppSelector((state) => state.chartData.vaccinated);

  const [data, setData] = useState<{ date: string; Vaccinated: unknown }[]>();

  const formatVaccineData = () => {
    const formattedData: { date: string; Vaccinated: unknown }[] = [];
    if (vaccineData.timeline) {
      Object.entries(vaccineData.timeline).map((key) => {
        formattedData.push({
          date: new Date(key[0]).toLocaleDateString(),
          Vaccinated: key[1],
        });
      });
    }

    return setData(formattedData);
  };

  useEffect(() => {
    formatVaccineData();
  }, [vaccineData]);

  return (
    <ResponsiveContainer
      className="custom-chart vaccine-chart"
      minHeight={175}
      minWidth={300}
    >
      <LineChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451b7" strokeOpacity={0.4} />
            <stop offset="75%" stopColor="#2451b7" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area dataKey="" stroke="#2451b7" fill="url(#color)" />
        <XAxis dataKey="date" axisLine={false} tickLine={false} stroke="#000" />
        <YAxis
          dataKey="Vaccinated"
          axisLine={false}
          tickLine={false}
          tickCount={10}
          stroke="#000"
        />
        <Tooltip />
        <CartesianGrid opacity={0.1} vertical={false} />
        <Line
          type="monotone"
          dataKey="Vaccinated"
          stroke="#2451b7"
          fill="url(#color)"
        />{" "}
      </LineChart>
    </ResponsiveContainer>
  );
};
