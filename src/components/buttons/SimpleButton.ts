import styled from "styled-components";

export const SimpleButton = styled.button`
  background: none;
  border: none;
  color: ${({ color }) => (color ? color : "#000")};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 10px;
  &:hover {
    color: #ddd;
  }
`;
