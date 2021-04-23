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
  onMouseOut,
  onClick,
}: {
  onClick: any;
  onMouseOut?: () => void;
  onMouseOver?: () => void;
  countryInfo: { lat: number; long: number };
  cases: number;
}): JSX.Element => {
  return (
    <Marker
      animation={window.google.maps.Animation.DROP}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
      position={{ lat: countryInfo.lat, lng: countryInfo.long }}
      clickable={true}
      onClick={onClick}
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
