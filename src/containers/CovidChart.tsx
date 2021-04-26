import React, { useMemo } from "react";
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
import { ChartsWrapper } from "../components/wrappers/ChartWrapper";
import { VaccineChart } from "./VaccinesChart";
import styled from "styled-components";
import Typography from "react-styled-typography";
import { ICountriesInfo } from "../types/covidTypes";
import { Select } from "../components/inputs/Select";
import { Box } from "../components/wrappers/Box";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../state/action-types";

const Footer = styled.footer`
  width: 100vw;
  min-height: 10vh;
  position: absolute;
  bottom: 0 !important;
  background: rgb(246, 245, 240);
  background: linear-gradient(
    180deg,
    rgba(246, 245, 240, 0.3617822128851541) 0%,
    rgba(21, 21, 21, 0.7035189075630253) 0%,
    rgba(21, 21, 21, 1) 100%
  );
  padding: 1rem 2rem 0.2rem 1rem;
  box-shadow: 0rem 0rem 15em 0.2em #fff;
`;

const ChartsDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1rem;
  color: #ddd;
`;
const ChartDescription = styled.div`
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const CovidChart = (): JSX.Element => {
  const { countriesInfo }: { countriesInfo: ICountriesInfo[] } = useAppSelector(
    (state) => state.chartData
  );
  const logkazka = useAppSelector((state) => state.chartData.countryCode);

  console.log(logkazka);

  const dispatch = useDispatch();

  const { error } = useAppSelector((state) => state.loadingAndError);

  const onChartPeriodChange = (e: any) => {
    console.log(e.target.value);
    dispatch({
      type: ActionTypes.CONTROL_CHART_PERIOD,
      payload: e.target.value,
    });
    dispatch({ type: ActionTypes.GET_CHART_DATA });
  };

  if (error || !countriesInfo.length)
    return (
      <NoResultsContainer>
        No data available on this destination, unfortunately.
      </NoResultsContainer>
    );

  return (
    <Footer>
      <Typography variant="h1" color="#fff" marginB="15" align="right">
        {countriesInfo.length && countriesInfo[0].country}
      </Typography>
      <ChartsDescriptionWrapper>
        <Typography variant="h4">Total cases/deaths/recovered</Typography>
        <Box width="300px">
          <Select placeholder="Control chart" onChange={onChartPeriodChange}>
            <option value="360">Control chart</option>{" "}
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="60">60 days</option>
          </Select>
        </Box>
        <Typography variant="h4">Total vaccinated</Typography>
      </ChartsDescriptionWrapper>
      <ChartsWrapper>
        {" "}
        <ResponsiveContainer
          className="custom-chart covid-chart"
          minWidth={300}
          height={175}
        >
          <LineChart data={countriesInfo && countriesInfo}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="red" strokeOpacity={0.4} />
                <stop offset="75%" stopColor="red" stopOpacity={0.1} />
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
      </ChartsWrapper>
    </Footer>
  );
};
