import React, { useEffect, useState, useRef } from "react";
import { Rectangle } from "../components/others/Rectangle";
import { useDispatch, useSelector } from "react-redux";
import { postRequest } from "../api/post";
import styled from "styled-components";
import { ActionTypes } from "../state/action-types";
import { Nav } from "../components/headers/Nav";
import { handleGetBoardStatus } from "../api/get";
import { InnerHover } from "../components/others/InnerHover";

interface IGameWrapper {
  height?: string;
}

const GameWrapper = styled.div<IGameWrapper>`
  width: 100%;
  min-height: ${({ height }) => (height ? height : "100vh")};
  position: relative;
`;

export const Game = (): JSX.Element => {
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState("");
  const [boardStatus, setBoardStatus] = useState<any>();

  const data = useSelector(
    (state: { boardData: { data: [] } }) => state.boardData.data
  );
  const loading = useSelector(
    (state: { boardData: { loading: boolean } }) => state.boardData
  );

  const getCoords = (e: React.MouseEvent<HTMLDivElement>) => {
    const posX = e.clientX;
    const posY =
      e.clientY -
      (gameContainerRef.current!.offsetTop - window.scrollY) +
      10000;

    const username = localStorage.getItem("username");
    const color = localStorage.getItem("color");
    postRequest(posX, posY, username, color);
  };

  useEffect(() => {
    dispatch({ type: ActionTypes.FETCH_BOARD_DATA });
  }, []);

  useEffect((): any => {
    return async () => {
      const boardStatus: any = await handleGetBoardStatus("/status");
      boardStatus && setBoardStatus(boardStatus);
    };
  }, [data]);

  const handleMouseEnter = (index: string) => {
    setHoveredIndex(index);
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex("");
    setHover(false);
  };

  return (
    <>
      <Nav />
      <GameWrapper ref={gameContainerRef} onClick={(e) => getCoords(e)}>
        {data && data.length
          ? data.map(
              ({
                data: { color, name },
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
                    onMouseEnter={() => handleMouseEnter(_id)}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    {_id === hoveredIndex ? (
                      <InnerHover visibility={hover}>
                        <p>Name: {name}</p>
                        <p>Color: {color}</p>
                      </InnerHover>
                    ) : null}
                  </Rectangle>
                );
              }
            )
          : ""}
      </GameWrapper>
    </>
  );
};
