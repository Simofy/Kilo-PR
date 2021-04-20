import styled from "styled-components";
import { primary } from "../../styles/colors";

export const HomePresentation = styled.div`
  flex: 1;
  padding: 2rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background: ${primary};
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
