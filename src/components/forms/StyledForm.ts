import styled from "styled-components";

export const StyledForm = styled.div`
  width: 30rem;
  padding: 2rem 1rem;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    border: none;
    width: 100vw;
  }
`;
