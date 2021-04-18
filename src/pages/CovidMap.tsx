import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../state/action-types";
import { Nav } from "../components/headers/Nav";
import { CustomGoogleMap } from "../containers/GoogleMap";
import { ReChart } from "../containers/ReChart";

export const CovidMap = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ActionTypes.COVID_DATA_BY_COUNTRY });
  }, []);

  return (
    <>
      <Nav />
      <CustomGoogleMap />
      <ReChart />
    </>
  );
};
