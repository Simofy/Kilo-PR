import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../state/action-types";
import { Nav } from "../components/headers/Nav";
import { CustomGoogleMap } from "../containers/GoogleMap";
import { CovidChart } from "../containers/CovidChart";
import axios from "axios";
import { URLS } from "../api/constant";

export const CovidMap = (): JSX.Element => {
  const dispatch = useDispatch();

  const getCountryByLatLang = async (lat: number, lng: number) => {
    const response = await axios({
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      method: "GET",
      url: `${URLS.GOOGLE_MAPS_API}latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_TOKEN}`,
    });
    console.log(response.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function ({
      coords: { latitude, longitude },
    }) {
      console.log("Latitude is :", latitude);
      console.log("Longitude is :", longitude);
      getCountryByLatLang(latitude, longitude);
    });
    dispatch({ type: ActionTypes.GET_COVID_DATA });
    dispatch({ type: ActionTypes.GET_CHART_DATA, payload: "LT" });
  }, []);

  return (
    <>
      <Nav />
      <CustomGoogleMap>
        <>
          <CovidChart />
        </>
      </CustomGoogleMap>
    </>
  );
};
