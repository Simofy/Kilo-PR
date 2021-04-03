import React, { useEffect, useState } from "react";
import { Rectangle } from "./components/others/Rectangle";
import { BASE_URL } from "./constants";
import { Home } from "./pages/Home";
import { Game } from "./pages/Game";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyles";

interface IBoardStatus {
  update?: string | number;
  maxX?: string | number;
  maxY?: string | number;
}

export const App = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/game" component={Game} exact />
      </Router>
    </>
  );
};

/*
  <div
      style={{
        height: "20vh",
        border: "1px solid red",
        width: `${boardStatus.maxX}px`,
        minHeight: `${boardStatus.maxY}px`,
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
            ) => (
              <Rectangle
                positionX={x}
                positionY={y}
                width="44px"
                height="45px"
                bgrColor={color}
                key={i}
              />
            )
          )
        : null}
    </div>
    */

/// Functionality

/*
      const [boardStatus, setBoardStatus] = useState<IBoardStatus>({});

  const [data, setData] = useState([]);
  const getBoard = async () => {
    const response = await fetch(
      `${BASE_URL}?x=0&y=0&w=${boardStatus.maxX}&h=${boardStatus.maxY}`
    );
    const data = await response.json();
    setData(data);
  };

  const updateBoardStatus = async () => {
    const response = await fetch(`${BASE_URL}/status`);
    const data = await response.json();
    const { update, maxX, maxY } = data[0];
    setBoardStatus({ update, maxX, maxY });
  };

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
    postRequest(posX, posY, "kugelis", "pink");
  };

  useEffect(() => {
    updateBoardStatus();
  }, []);

  useEffect(() => {
    getBoard();
  }, [boardStatus]);

  console.log(boardStatus.update);
  */
