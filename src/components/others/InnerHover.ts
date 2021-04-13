import styled from "styled-components";
import { primary } from "../../styles/colors";

interface IinnerHover {
  visibility: boolean;
}

export const InnerHover = styled.div<IinnerHover>`
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
