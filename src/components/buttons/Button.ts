import styled from "styled-components";
import { secondary } from "../../styles/colors";

interface IButton {
  width?: string;
}

export const Button = styled.button<IButton>`
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  color: #fff;
  background: ${secondary};
  width: ${({ width }) => (width ? width : "5rem")};
`;
