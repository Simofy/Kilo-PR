import React from "react";
import { Marker } from "@react-google-maps/api";
import { MarkerColors } from "../../styles/colors";

const formatMarkerByCases = (cases: number): string => {
  if (cases < 1000) {
    return MarkerColors.lightMarker;
  } else if (cases > 1000 && cases < 3000) {
    return MarkerColors.mediumMarker;
  } else if (cases > 3000 && cases < 10000) {
    return MarkerColors.mediumStrongMarker;
  }

  return MarkerColors.strongMarker;
};

const formatMarkerSizeByCases = (cases: number) => {
  if (cases < 1000) {
    return 20;
  } else if (cases > 1000 && cases < 3000) {
    return 30;
  } else if (cases > 3000 && cases < 10000) {
    return 40;
  }
  return 50;
};

export const CustomMarker = ({
  onClick,
  countryInfo,
  cases,
}: {
  onClick: () => void;
  countryInfo: { lat: number; long: number };
  cases: number;
}): JSX.Element => {
  return (
    <Marker
      onClick={onClick}
      position={{ lat: countryInfo.lat, lng: countryInfo.long }}
      icon={{
        url: `data:image/svg+xml,%3Csvg  viewBox='0 0 100 100' fill='${formatMarkerByCases(
          cases
        )}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='50'/%3E%3C/svg%3E`,

        anchor: new google.maps.Point(17, 46),
        origin: new window.google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(
          formatMarkerSizeByCases(cases),
          formatMarkerSizeByCases(cases)
        ),
      }}
    />
  );
};
