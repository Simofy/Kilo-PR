import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useAppSelector } from "../hooks";
import { ActionTypes } from "../state/action-types";
import { CustomMarker } from "../components/others/CustomMarker";
import "@reach/combobox/styles.css";
import { CustomInfoWindow } from "../components/others/CustomInfoWindow";
import {
  libraries,
  mapContainerStyle,
  options,
  center,
} from "../constants/googleMaps";

import { GoogleMapsSearch } from "../components/others/GoogleMapsSearch";

export const CustomGoogleMap = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const covidData: any = useAppSelector((state) => state.covidData.data);
  const [selected, setSelected] = React.useState<any>(null);
  const mapRef = React.useRef<any>(null);
  const dispatch = useDispatch();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDUSy6au1UtftlSlYoHm3xz3y4QS1K6Kwk",
    libraries,
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleMarkerMouseOver = useCallback((countryInfo) => {
    setSelected(countryInfo);
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const handleMarkerClick = (country: { iso2: string }) => {
    dispatch({ type: ActionTypes.FETCH_CHART_DATA, payload: country.iso2 });
  };

  if (loadError) return <div>error</div>;
  if (!isLoaded) return <div>loading</div>;

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
        {covidData &&
          covidData.map((item: any) => {
            const { countryInfo, casesPerOneMillion } = item;

            return (
              <CustomMarker
                cases={casesPerOneMillion}
                key={countryInfo._id + Math.random() * 10}
                onClick={() => handleMarkerClick(countryInfo)}
                countryInfo={countryInfo}
                onMouseOver={() => handleMarkerMouseOver(countryInfo)}
              />
            );
          })}

        {selected ? (
          <CustomInfoWindow selected={selected} setSelected={setSelected} />
        ) : null}
        {children}
      </GoogleMap>
    </div>
  );
};
