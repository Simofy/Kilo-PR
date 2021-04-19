import styled from "styled-components";

export const ButtonGroup = styled.div`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;
