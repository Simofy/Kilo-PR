import React from "react";
import { Marker } from "@react-google-maps/api";
import {
  formatMarkerByCases,
  formatMarkerSizeByCases,
} from "../../helpers/formatHelpers";

export const CustomMarker = ({
  countryInfo,
  cases,
  onMouseOver,
  onClick,
}: {
  onMouseOver?: () => void;
  onClick: () => void;
  countryInfo: { lat: number; long: number };
  cases: number;
}): JSX.Element => {
  return (
    <Marker
      onClick={onClick}
      onMouseOver={onMouseOver}
      position={{ lat: countryInfo.lat, lng: countryInfo.long }}
      clickable={true}
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
    ></Marker>
  );
};
