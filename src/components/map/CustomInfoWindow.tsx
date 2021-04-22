import React, { useCallback } from "react";
import { InfoWindow } from "@react-google-maps/api";
import styled from "styled-components";
import { BsFillBarChartFill } from "react-icons/bs";
import { IconButton } from "../buttons/IconButton";
import { Box } from "../wrappers/Box";
import { Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../state/action-types";
import { useAppSelector } from "../../hooks";
import Loader from "react-loader-spinner";
import { primary } from "../../styles/colors";
import { ICovidData } from "../../types/covidTypes";

const ChartIcon = styled(BsFillBarChartFill)`
  transition: 0.2s ease;
  &:hover {
    color: #ddd;
  }
`;

const CountryInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

interface ICountryDetails {
  _id: number;
  long: number;
  lat: number;
  iso2: string;
  iso3: string;
  flag: string;
}

interface ICountryObject {
  countryInfo: ICountryDetails;
  population: number;
  cases: number;
  country: string;
}

export const CustomInfoWindow = ({
  selected,
  setSelected,
}: {
  onMouseLeave: () => void;
  selected: ICountryObject;
  setSelected: (args: null | ICovidData) => void;
}): JSX.Element => {
  const onCloseClick = useCallback(() => {
    setSelected(null);
  }, []);

  const { loading } = useAppSelector((state) => state.loadingAndError);

  const dispatch = useDispatch();

  const handleChartClick = (iso2: string) => {
    dispatch({ type: ActionTypes.GET_CHART_DATA, payload: iso2 });
  };

  return (
    <InfoWindow
      position={{
        lat: selected.countryInfo.lat,
        lng: selected.countryInfo.long,
      }}
      onCloseClick={onCloseClick}
    >
      <div>
        <Box mb="0.3rem">
          <CountryInfo>
            <h5>{selected.country}</h5>

            <img
              srcSet={selected.countryInfo.flag}
              style={{ height: "15px" }}
            />
          </CountryInfo>
        </Box>
        <h6>Population: {selected.population}</h6>
        <h6>Total cases: {selected.cases}</h6>
        <Box mt="0.3rem">
          <Tooltip title="Show in chart">
            <IconButton
              onClick={() => handleChartClick(selected.countryInfo.iso2)}
              aria-label="show in chart"
            >
              {loading ? (
                <Loader type="Puff" width="20" height="20" color={primary} />
              ) : (
                <ChartIcon size={20} />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </div>
    </InfoWindow>
  );
};
