import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import { countriesData } from "../constants/countriesData";

import "@reach/combobox/styles.css";
import mapStyles from "../styles/mapStyles";

const libraries: any = ["places"];
const mapContainerStyle = {
  height: "93vh",
  width: "100%",
};
const options = {
  disableDefaultUI: false,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

export const CustomGoogleMap = (): any => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDUSy6au1UtftlSlYoHm3xz3y4QS1K6Kwk",
    libraries,
  });
  const [selected, setSelected] = React.useState<any>(null);

  const mapRef = React.useRef<any>(null);
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {countriesData &&
          countriesData.ref_country_codes.map((marker: any) => {
            return (
              <Marker
                key={`${marker.latitude}-${marker.longitude}`}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                icon={{
                  url: "http://s.cdpn.io/3/kiwi.svg",

                  anchor: new google.maps.Point(17, 46),
                  origin: new window.google.maps.Point(0, 0),
                  scaledSize: new google.maps.Size(37, 37),
                }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            );
          })}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  🐻
                </span>{" "}
                Alert
              </h2>
              <p>{selected.country}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

function Locate({ panTo }: any) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }: any) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }: any) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
