import React, { useEffect, useState } from "react";
import { Rectangle } from "../components/others/Rectangle";
import { useDispatch, useSelector } from "react-redux";
import { postRequest } from "../api/post";
import styled from "styled-components";

interface IinnerHover {
  display: boolean;
}

const InnerHover = styled.div<IinnerHover>`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.3rem;
  background: #ddd;
  font-size: 30px;
  transform: translateY(-50%);
  display: ${({ display }) => (display ? "block" : "none")};
  z-index: 10;
`;

export const Game = (): JSX.Element => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = useSelector(
    (state: { boardData: { data: [] } }) => state.boardData.data
  );

  const getCoords = (e: React.MouseEvent<HTMLDivElement>) => {
    const posX = e.clientX;
    const posY = e.clientY;
    postRequest(posX, posY, "uuuu", "red");
  };

  useEffect(() => {
    dispatch({ type: "FETCH_BOARD_DATA" });
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setHover(false);
  };

  return (
    <div
      style={{
        height: "20vh",
        width: "100%",
        minHeight: "100vh",
        margin: "0 auto",
        position: "relative",
      }}
      onClick={(e) => getCoords(e)}
    >
      {data && data.length
        ? data.map(
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
                    <InnerHover display={hover}>
                      <p>Name: {name}</p>
                      <p>Color: {color}</p>
                    </InnerHover>
                  ) : null}
                </Rectangle>
              );
            }
          )
        : null}
    </div>
  );
};
