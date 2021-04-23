import React, { useCallback } from "react";
import { InfoWindow } from "@react-google-maps/api";
import styled from "styled-components";
import { Box } from "../wrappers/Box";
import { useAppSelector } from "../../hooks";
import Loader from "react-loader-spinner";
import { ICovidData } from "../../types/covidTypes";
import Typography from "react-styled-typography";

const CountryInfo = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 10rem;
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
  selected: ICountryObject;
  setSelected: (args: null | ICovidData) => void;
}): JSX.Element => {
  const onCloseClick = useCallback(() => {
    setSelected(null);
  }, []);

  const { loading } = useAppSelector((state) => state.loadingAndError);

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
        <Typography variant="h6" marginT="10">
          Population: {selected.population}
        </Typography>
        <Typography variant="h6" marginT="5" marginB="10">
          Total cases: {selected.cases}
        </Typography>
        {loading ? (
          <Loader type="Puff" width={10} height={10} color="#000" />
        ) : (
          ""
        )}
      </div>
    </InfoWindow>
  );
};
