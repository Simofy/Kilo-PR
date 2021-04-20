import styled from "styled-components";
import { primary } from "../../styles/colors";

export const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  background: ${primary};
  color: #fff;
  font-size: 16px;
`;

export const ProfileButton = styled(Button)`
  padding: 0.3rem;
  font-size: 11px;
  width: 100%;
`;
