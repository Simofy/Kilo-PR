import React, { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import { Rectangle } from "../components/others/Rectangle";
import { useDispatch, useSelector } from "react-redux";

export const Game = (): JSX.Element => {
  const dispatch = useDispatch();
  const data = useSelector(
    (state: { boardData: { data: [] } }) => state.boardData.data
  );

  console.log(data);

  const postRequest = async (
    x: string | number,
    y: string | number,
    name: string,
    color: string
  ) => {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x,
        y,
        name,
        color,
      }),
    });
    console.log(response);
  };

  const getCoords = (e: React.MouseEvent<HTMLDivElement>) => {
    const posX = e.clientX;
    const posY = e.clientY;
    console.log(posY, posX);

    postRequest(posX, posY, "uuuu", "red");
  };

  useEffect(() => {
    dispatch({ type: "FETCH_BOARD_DATA" });
  }, []);

  return (
    <div
      style={{
        height: "20vh",
        border: "1px solid red",
        width: "100%",
        minHeight: "1200px",
        margin: "0 auto",
        position: "relative",
      }}
      onClick={(e) => getCoords(e)}
    >
      {data && data.length
        ? data.map(
            (
              {
                data: { name, color, createdAt },
                x,
                y,
              }: {
                data: { name: string; color: string; createdAt: string };
                x: string;
                y: string;
              },
              i: number
            ) => {
              return (
                <Rectangle
                  positionX={x}
                  positionY={y}
                  width="20px"
                  height="20px"
                  bgrColor={color}
                  key={i}
                />
              );
            }
          )
        : null}
    </div>
  );
};
