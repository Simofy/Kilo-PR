import React from "react";
import { useSelector } from "react-redux";
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

import "@reach/combobox/styles.css";
import mapStyles from "../styles/mapStyles";

const libraries: any = ["places"];
const mapContainerStyle = {
  height: "93vh",
  width: "100%",
};
const options: any = {
  disableDefaultUI: false,
  zoomControl: true,
  styles: mapStyles,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

export const CustomGoogleMap = (): any => {
  const covidData = useSelector((state: any) => state.covidData.data);

  console.log(covidData);

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
        {covidData &&
          covidData.map(({ countryInfo }: any) => {
            return (
              <Marker
                key={`${countryInfo.lat}-${countryInfo.long}`}
                position={{ lat: countryInfo.lat, lng: countryInfo.long }}
                icon={{
                  url:
                    "data:image/svg+xml,%3Csvg  viewBox='0 0 100 100' fill='blue' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='50'/%3E%3C/svg%3E",

                  anchor: new google.maps.Point(17, 46),
                  origin: new window.google.maps.Point(0, 0),
                  scaledSize: new google.maps.Size(30, 40),
                }}
                onMouseOver={() => {
                  setSelected(countryInfo);
                }}
              />
            );
          })}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.long }}
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
              <p>{selected.iso2}</p>
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
