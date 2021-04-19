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
  setSelected: any;
}): JSX.Element => {
  const onCloseClick = useCallback(() => {
    setSelected(null);
  }, []);
  console.log(selected);

  return (
    <InfoWindow
      position={{ lat: selected.lat + 1, lng: selected.long + 0.3 }}
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
