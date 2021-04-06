import React, { useEffect, useState, useRef } from "react";
import { Rectangle } from "../components/others/Rectangle";
import { useDispatch, useSelector } from "react-redux";
import { postRequest } from "../api/post";
import styled from "styled-components";
import { ActionTypes } from "../state/action-types";
import { Nav } from "../components/headers/Nav";
import { primary } from "../styles/colors";
import { LoaderWrapper } from "../components/wrappers/LoaderWrapper";
import Loader from "react-loader-spinner";
import { handleGetBoardStatus } from "../api/get";

interface IinnerHover {
  visibility: boolean;
}

interface IGameWrapper {
  height?: string;
}

const InnerHover = styled.div<IinnerHover>`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background: ${primary};
  color: #fff;
  font-size: 16px;
  visibility: ${({ visibility }) => (visibility ? "visible" : "hidden")};
  transition: all 0.5s ease-in-out;
  z-index: 10;
  border-radius: 0.2rem;
  min-width: 180px;
  height: 0;
  opacity: 0;
  &:hover {
    height: fit-content;
    opacity: 1;
  }
`;

const GameWrapper = styled.div<IGameWrapper>`
  width: 100%;
  min-height: ${({ height }) => (height ? height : "100vh")};
  position: relative;
`;

export const Game = ({
  location: { pathname },
}: {
  location: { pathname: string };
}): JSX.Element => {
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [boardStatus, setBoardStatus] = useState<any>();

  const data = useSelector(
    (state: { boardData: { data: [] } }) => state.boardData.data
  );

  const getCoords = (e: React.MouseEvent<HTMLDivElement>) => {
    const posX = e.clientX;
    const posY =
      e.clientY - (gameContainerRef.current!.offsetTop - window.scrollY);
    console.log(window.scrollY);

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

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setHover(false);
  };

  return (
    <>
      <Nav
        maxX={boardStatus && boardStatus[0].maxX}
        maxY={boardStatus && boardStatus[0].maxY}
        updatedTimes={boardStatus && boardStatus[0].update}
      />
      <GameWrapper ref={gameContainerRef} onClick={(e) => getCoords(e)}>
        {data && data.length ? (
          data.map(
            (
              {
                data: { color, name },
                x,
                y,
              }: {
                data: { name: string; color: string };
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
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  {i === hoveredIndex ? (
                    <InnerHover visibility={hover}>
                      <p>Name: {name}</p>
                      <p>Color: {color}</p>
                    </InnerHover>
                  ) : null}
                </Rectangle>
              );
            }
          )
        ) : (
          <LoaderWrapper>
            <Loader type="Oval" color="#00BFFF" height={80} width={80} />
          </LoaderWrapper>
        )}
      </GameWrapper>
    </>
  );
};
