import React, { useEffect } from "react";
import { Rectangle } from "../components/others/Rectangle";
import { useDispatch, useSelector } from "react-redux";
import { postRequest } from "../api/post";
import styled from "styled-components";
import { ActionTypes } from "../state/action-types";
import { Nav } from "../components/headers/Nav";
import { Map } from "../containers/Map";

export const Game = (): JSX.Element => {
  const dispatch = useDispatch();

  const data = useSelector(
    (state: { boardData: { data: [] } }) => state.boardData.data
  );

  const getCoords = (e: any) => {
    const posX = e.clientX;
    const posY = e.clientY - (e.target.offsetTop - window.scrollY) + 10000;

    const username = localStorage.getItem("username");
    const color = localStorage.getItem("color");
    postRequest(posX, posY, username, color);
  };

  useEffect(() => {
    dispatch({ type: ActionTypes.FETCH_BOARD_DATA });
  }, []);

  return (
    <>
      <Nav />
      <Map />
    </>
  );
};

/*
{data && data.length
          ? data.map(
              ({
                data: { color },
                _id,
                x,
                y,
              }: {
                data: { name: string; color: string };
                x: number;
                y: number;
                _id: string;
              }) => {
                return (
                  <Rectangle
                    positionX={Number(x)}
                    positionY={Number(y) - 10000}
                    width="20px"
                    height="20px"
                    bgrColor={color}
                    key={_id}
                  />
                );
              }
            )
          : ""}
          */
