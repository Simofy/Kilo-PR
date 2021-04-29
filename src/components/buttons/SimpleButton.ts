import styled from "styled-components";
import { primary, secondary } from "../../styles/colors";

export const SimpleButton = styled.button`
  background: none;
  border: 1px solid ${secondary};
  border-top: none;
  color: ${({ color }) => (color ? color : "#000")};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  width: 100%;
  padding: 0.5rem;
  &:hover {
    color: #ddd;
  }
`;
