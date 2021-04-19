import React from "react";
import {
  XAxis,
  Tooltip,
  CartesianGrid,
  Area,
  LineChart,
  YAxis,
  Line,
} from "recharts";

export const CustomLineChart = ({
  chartData,
}: {
  chartData: any;
}): JSX.Element => {
  return (
    <LineChart data={chartData}>
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
  );
};
