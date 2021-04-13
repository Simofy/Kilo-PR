import styled from "styled-components";
import React from "react";

interface IRectangle {
  bgrColor: string;
  positionY: number;
  positionX: number;
  width: string;
  height: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> & (() => void);
}

export const Rectangle = styled.div<IRectangle>`
  position: absolute;
  background: ${({ bgrColor }) => bgrColor};
  top: ${({ positionY }) => `${positionY}px`};
  left: ${({ positionX }) => `${positionX}px`};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
`;
