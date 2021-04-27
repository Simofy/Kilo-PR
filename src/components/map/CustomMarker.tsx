import React from "react";
import { Marker } from "@react-google-maps/api";
import { formatMarkerSizeByCases } from "../../helpers/formatHelpers";
import oval from "../../assets/oval.svg";
import greenOval from "../../assets/greenOval.svg";
import { useAppSelector } from "../../hooks";

export const CustomMarker = ({
  countryInfo,
  cases,
  onMouseOver,
  onMouseOut,
  onClick,
}: {
  onClick: () => void;
  onMouseOut?: () => void;
  onMouseOver?: () => void;
  countryInfo: { lat: number; long: number; iso2: string };
  cases: number;
}): JSX.Element => {
  const { countryCode } = useAppSelector((state) => state.chartData);

  return (
    <Marker
      options={{
        optimized: true,
      }}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
      position={{ lat: countryInfo.lat, lng: countryInfo.long }}
      clickable={true}
      onClick={onClick}
      icon={{
        url: countryCode === countryInfo.iso2 ? greenOval : oval,
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
