import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMapGL from "react-map-gl";
import { Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { ActionTypes } from "../state/action-types";
import { RiVirusFill } from "react-icons/ri";
import styled from "styled-components";
import "mapbox-gl/dist/mapbox-gl.css";

const IconButton = styled.button`
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  transform: translate(-50%, -100%);
  cursor: pointer;
`;

interface IViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  width: string;
  height: string;
}

export const mapToken =
  "pk.eyJ1IjoiZ2Fsdm90YXMiLCJhIjoiY2tuaHBsanE4Mm5vcjJxbGM2MGRrNHN3OCJ9.ODxdS1urs6_NNA5Z4NWiFQ";

export const Map = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 2,
    width: "100vw",
    height: "93vh",
  });
  const [showPopup, togglePopup] = React.useState(false);
  const [coordinates, setCoordinates] = useState<any>();

  const countryData = useSelector(
    (state: any) => state.covidData.data[state.covidData.data.length - 1]
  );

  const dispatch = useDispatch();

  const mapRef = useRef(null);
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 3000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  const handleMapClick = async (e: any) => {
    const { lngLat } = e;
    if (e.features.length) {
      const choosenCountry = e.features[0].properties.iso_3166_1;
      togglePopup(true);
      choosenCountry &&
        dispatch({ type: ActionTypes.SET_COUNTRY, payload: choosenCountry });
    } else if (showPopup) {
      togglePopup(false);
    }

    setCoordinates({ lng: lngLat[0], lat: lngLat[1] });
  };

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      mapboxApiAccessToken={mapToken}
      mapStyle="mapbox://styles/galvotas/cknlwp8bq37b117mi3gu90pfi"
      onViewportChange={(viewport: IViewport) => setViewport(viewport)}
      onClick={handleMapClick}
    >
      <Geocoder
        mapRef={mapRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={mapToken}
        position="top-left"
      />
      {coordinates && (
        <>
          {showPopup && (
            <Popup
              closeButton={true}
              closeOnClick={false}
              onClose={() => togglePopup(false)}
              longitude={coordinates.lng}
              latitude={coordinates.lat}
              offsetTop={-30}
            >
              <div>
                Total:
                {countryData && (
                  <>
                    <p>Confirmed: {countryData.Confirmed}</p>
                    <p>Active: {countryData.Active}</p>
                    <p>Deaths: {countryData.Deaths}</p>
                    <p>Recovered: {countryData.Recovered}</p>
                  </>
                )}
              </div>
            </Popup>
          )}
          <Marker longitude={coordinates.lng} latitude={coordinates.lat}>
            <IconButton>
              <RiVirusFill size={20} color="red" opacity={0.5} />
            </IconButton>
          </Marker>
        </>
      )}
      {children}
    </ReactMapGL>
  );
};
