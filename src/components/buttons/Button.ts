import styled from "styled-components";
import { secondary } from "../../styles/colors";

export const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  color: #fff;
  background: ${secondary};
  min-width: 5rem;
`;
