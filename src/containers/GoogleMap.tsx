import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useAppSelector } from "../hooks";
import { ActionTypes } from "../state/action-types";
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

import { GoogleMapsSearch } from "../components/map/GoogleMapsSearch";

export const CustomGoogleMap = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const covidData: any = useAppSelector((state) => state.covidData.data);
  const [selected, setSelected] = React.useState<any>(null);
  const mapRef = React.useRef<any>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries,
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleMarkerMouseOver = useCallback((item) => {
    setSelected(item);
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const savedData = useMemo(
    () =>
      covidData
        ? covidData.map((item: any) => {
            const { countryInfo, casesPerOneMillion } = item;
            return (
              <CustomMarker
                cases={casesPerOneMillion}
                key={countryInfo._id + Math.random() * 10}
                countryInfo={countryInfo}
                onMouseOver={() => handleMarkerMouseOver(item)}
              />
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
        {selected ? (
          <CustomInfoWindow
            onMouseLeave={() => setSelected(null)}
            selected={selected}
            setSelected={setSelected}
          />
        ) : null}
        {children}
      </GoogleMap>
    </div>
  );
};
