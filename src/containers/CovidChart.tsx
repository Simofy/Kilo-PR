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
import { VaccineChart } from "./VaccinesChart";
import styled from "styled-components";
import Typography from "react-styled-typography";
import { ICountriesInfo } from "../types/covidTypes";
import { Select } from "../components/inputs";
import { Box, ChartsWrapper, NoResultsContainer } from "../components/wrappers";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../state/action-types";

const Footer = styled.footer`
  width: 100vw;
  min-height: 10vh;
  position: absolute;
  bottom: 0 !important;
  background: rgb(246, 245, 240, 0.98);
  padding: 1rem 2rem 0.2rem 1rem;
`;

const ChartsDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1rem;
  color: #ddd;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;
export const HideOnMobile = styled.div`
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const CovidChart = (): JSX.Element => {
  const { countriesInfo }: { countriesInfo: ICountriesInfo[] } = useAppSelector(
    (state) => state.chartData
  );

  const dispatch = useDispatch();

  const { error } = useAppSelector((state) => state.loadingAndError);

  const onChartPeriodChange = (e: { target: { value: string } }) => {
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
      <Typography variant="h1" color="#000" marginB="15" align="right">
        {countriesInfo.length && countriesInfo[0].country}
      </Typography>
      <ChartsDescriptionWrapper>
        <Typography variant="h4" marginB="10" color="#000">
          Total cases/deaths/recovered
        </Typography>
        <Box width="300px">
          <Select placeholder="Control chart" onChange={onChartPeriodChange}>
            <option value="360">Control chart</option>{" "}
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="60">60 days</option>
          </Select>
        </Box>
        <HideOnMobile>
          <Typography variant="h4" marginB="10" color="#000">
            Total vaccinated
          </Typography>
        </HideOnMobile>
      </ChartsDescriptionWrapper>
      <ChartsWrapper>
        {" "}
        <ResponsiveContainer
          className="custom-chart covid-chart"
          minWidth={300}
          height={175}
        >
          <LineChart data={countriesInfo && countriesInfo}>
            <Area dataKey="Cases" />
            <XAxis
              dataKey="Date"
              axisLine={false}
              tickLine={false}
              stroke="#000"
            />
            <YAxis
              dataKey="Cases"
              axisLine={false}
              tickLine={false}
              tickCount={10}
              stroke="#000"
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
