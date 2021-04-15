import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import { Marker } from "react-map-gl";

interface IViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  width: string;
  height: string;
}

const mapToken =
  "pk.eyJ1IjoiZ2Fsdm90YXMiLCJhIjoiY2tuaHBsanE4Mm5vcjJxbGM2MGRrNHN3OCJ9.ODxdS1urs6_NNA5Z4NWiFQ";

export const Map = (): JSX.Element => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
    width: "100vw",
    height: "100vh",
  });

  const seeResult = (res: any) => {
    console.log(res);
  };
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={mapToken}
      mapStyle="mapbox://styles/galvotas/cknhqad261jih17rxra99b84w"
      onViewportChange={(viewport: IViewport) => setViewport(viewport)}
      onClick={seeResult}
    >
      <Marker longitude={-75.6903} latitude={45.4211}>
        <button style={{ color: "red", fontSize: "1rem" }}>
          HERE IS MARKER
        </button>
      </Marker>
    </ReactMapGL>
  );
};
