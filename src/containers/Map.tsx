import React, { useState, useRef, useCallback } from "react";
import ReactMapGL from "react-map-gl";
import { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

interface IViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  width: string;
  height: string;
}

const mapToken =
  "pk.eyJ1IjoiZ2Fsdm90YXMiLCJhIjoiY2tuaHBsanE4Mm5vcjJxbGM2MGRrNHN3OCJ9.ODxdS1urs6_NNA5Z4NWiFQ";

export const Map = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
    width: "100vw",
    height: "93vh",
  });

  const mapRef = useRef(null);
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  const handleMapClick = (e: any) => {
    console.log(e);
  };

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      mapboxApiAccessToken={mapToken}
      mapStyle="mapbox://styles/galvotas/cknhqad261jih17rxra99b84w"
      onViewportChange={(viewport: IViewport) => setViewport(viewport)}
      onClick={handleMapClick}
    >
      <Geocoder
        mapRef={mapRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={mapToken}
        position="top-left"
      />
      <Marker longitude={-75.6903} latitude={45.4211}>
        <button style={{ color: "red", fontSize: "1rem" }}>
          HERE IS MARKER
        </button>
      </Marker>
      {children}
    </ReactMapGL>
  );
};
