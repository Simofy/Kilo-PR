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
import Typography from "react-styled-typography";
import { IVaccinationData } from "../state/reducers/chartReducer";

export const VaccineChart = (): JSX.Element => {
  const vaccineData: any = useAppSelector(
    (state) => state.chartData.vaccinated
  );

  const [data, setData] = useState();

  const formatVaccineData = () => {
    const formattedData: any = [];
    if (vaccineData.timeline) {
      Object.entries(vaccineData.timeline).map((key) => {
        formattedData.push({
          date: new Date(key[0]).toLocaleDateString(),
          value: key[1],
        });
      });
    }

    return setData(formattedData);
  };

  useEffect(() => {
    formatVaccineData();
  }, [vaccineData]);

  return (
    <>
      <Typography
        variant="h2"
        marginT="10"
        marginB="10"
        color="#fff"
        align="center"
      >
        Vaccination
      </Typography>
      <ResponsiveContainer minWidth={300} height={100}>
        <LineChart data={data && data}>
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
            tickCount={10}
          />
          <Tooltip />
          <CartesianGrid opacity={0.1} vertical={false} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2451b7"
            fill="url(#color)"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
