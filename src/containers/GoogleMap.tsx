import React, { useCallback, useMemo } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useAppSelector } from "../hooks";
import { CustomMarker } from "../components/map/CustomMarker";
import "@reach/combobox/styles.css";
import { CustomInfoWindow, GoogleMapsSearch } from "../components/map";
import {
  libraries,
  mapContainerStyle,
  options,
  center,
} from "../constants/googleMaps";
import Loader from "react-loader-spinner";
import Typography from "react-styled-typography";
import { ICovidData } from "../types/covidTypes";
import { ActionTypes } from "../state/action-types";
import { useDispatch } from "react-redux";

export const CustomGoogleMap = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const covidData: ICovidData[] = useAppSelector(
    (state) => state.chartData.covidData
  );

  type Test = {
    mapRef?: google.maps.Map | undefined;
  };

  const [selected, setSelected] = React.useState<ICovidData | null>(null);
  const mapSelector = useMemo<{ mapRef?: google.maps.Map }>((): Test => {
    return {
      mapRef: undefined,
    };
  }, []);

  const dispatch = useDispatch();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_TOKEN as string,
    libraries,
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapSelector.mapRef = map;
  }, []);

  const handleMarkerMouseOver = useCallback((item) => {
    setSelected(item);
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapSelector.mapRef?.panTo({ lat, lng });
    mapSelector.mapRef?.setZoom(8);
  }, []);

  const handleMouseClick = useCallback((item: { iso2: string }) => {
    dispatch({ type: ActionTypes.SET_COUNTRY, payload: item.iso2 });
    dispatch({ type: ActionTypes.GET_CHART_DATA, payload: item.iso2 });
  }, []);

  const savedData = useMemo(
    () =>
      covidData
        ? covidData.map((item: ICovidData) => {
            const { countryInfo, casesPerOneMillion } = item;
            return (
              <CustomMarker
                cases={casesPerOneMillion}
                key={countryInfo._id + Math.random() * 10}
                countryInfo={countryInfo}
                onClick={() => handleMouseClick(countryInfo)}
                onMouseOver={() => handleMarkerMouseOver(item)}
                onMouseOut={() => setSelected(null)}
              ></CustomMarker>
            );
          })
        : [],
    [covidData]
  );

  if (loadError)
    return (
      <Typography variant="h3" color="#000">
        Something went wrong. Please try reloading page.
      </Typography>
    );
  if (!isLoaded)
    return <Loader type="Puff" height={25} width={25} color="#00BFFF" />;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={4}
      center={center}
      options={options}
      onLoad={onMapLoad}
    >
      <GoogleMapsSearch panTo={panTo} />
      {savedData}
      {selected && (
        <CustomInfoWindow selected={selected} setSelected={setSelected} />
      )}
      {children}
    </GoogleMap>
  );
};
