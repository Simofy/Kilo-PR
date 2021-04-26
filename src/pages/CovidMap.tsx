import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../state/action-types";
import { Nav } from "../components/headers/Nav";
import { CustomGoogleMap } from "../containers/GoogleMap";
import { CovidChart } from "../containers/CovidChart";

import Geocode from "react-geocode";
import { CovidModal } from "../components/modals/CovidModal";
import { useAppSelector } from "../hooks";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_TOKEN!);

export const CovidMap = (): JSX.Element => {
  const { countriesInfo } = useAppSelector((state) => state.chartData);
  const dispatch = useDispatch();

  const memoChart = useMemo(() => {
    return <CovidChart />;
  }, [countriesInfo]);

  useEffect(() => {
    dispatch({ type: ActionTypes.GET_COVID_DATA });
  }, []);

  return (
    <>
      <Nav />
      <CovidModal />
      <CustomGoogleMap>{memoChart}</CustomGoogleMap>
    </>
  );
};
