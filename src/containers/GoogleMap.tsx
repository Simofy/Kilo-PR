import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useAppSelector } from "../hooks";
import { CustomMarker } from "../components/map/CustomMarker";
import "@reach/combobox/styles.css";
import { CustomInfoWindow } from "../components/map/CustomInfoWindow";
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
import { GoogleMapsSearch } from "../components/map/GoogleMapsSearch";
import { useDispatch } from "react-redux";

export const CustomGoogleMap = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const covidData: ICovidData[] = useAppSelector(
    (state) => state.chartData.covidData
  );
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState<ICovidData | null>(null);
  const mapRef = React.useRef<React.MutableRefObject<null> | any>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_TOKEN!,
    libraries,
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleMarkerMouseOver = useCallback((item) => {
    setSelected(item);
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current?.panTo({ lat, lng });
    mapRef.current?.setZoom();
  }, []);

  const handleMouseClick = (item: { iso2: string }) => {
    dispatch({ type: ActionTypes.GET_CHART_DATA, payload: item.iso2 });
  };

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
    <div>
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
    </div>
  );
};
