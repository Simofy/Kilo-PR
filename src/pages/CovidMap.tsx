import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../state/action-types";
import { Nav } from "../components/headers/Nav";
import { CustomGoogleMap } from "../containers/GoogleMap";
import { CovidChart } from "../containers/CovidChart";

import Geocode from "react-geocode";
import { formatLocation } from "../helpers/formatLocation";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_TOKEN!);

export const CovidMap = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ActionTypes.GET_COVID_DATA });
  }, []);

  return (
    <>
      <Nav />
      <CustomGoogleMap>
        <CovidChart />
      </CustomGoogleMap>
    </>
  );
};
