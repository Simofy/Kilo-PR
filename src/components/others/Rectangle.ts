import styled from "styled-components";
import React from "react";

interface IRectangle {
  bgrColor: string;
  positionY: string;
  positionX: string;
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
`;
