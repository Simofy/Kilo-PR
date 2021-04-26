import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 80vw;
  color: #fff;
  padding: 0.5rem;
  border: 1px solid #fff;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 975px) {
    width: 100vw;
    height: 85vh;
  }
`;
