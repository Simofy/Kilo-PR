import React, { useCallback } from "react";
import { InfoWindow } from "@react-google-maps/api";

interface ICountryDetails {
  _id: number;
  long: number;
  lat: number;
  iso2: string;
  iso3: string;
  flag: string;
}

export const CustomInfoWindow = ({
  selected,
  setSelected,
}: {
  selected: ICountryDetails;
  setSelected: (args: null | ICountryDetails) => void;
}): JSX.Element => {
  const onCloseClick = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <InfoWindow
      position={{ lat: selected.lat, lng: selected.long }}
      onCloseClick={onCloseClick}
    >
      <div>
        <h2>
          <span role="img" aria-label="bear">
            🐻
          </span>{" "}
          Alert
        </h2>
        <p>{selected.iso2}</p>
      </div>
    </InfoWindow>
  );
};
