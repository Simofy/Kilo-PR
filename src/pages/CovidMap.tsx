import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../state/action-types";
import { Nav } from "../components/headers/Nav";
import { CustomGoogleMap } from "../containers/GoogleMap";
import { CovidChart } from "../containers/CovidChart";

export const CovidMap = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ActionTypes.GET_COVID_DATA });
    dispatch({ type: ActionTypes.GET_CHART_DATA, payload: "LT" });
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
