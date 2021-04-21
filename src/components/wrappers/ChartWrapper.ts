import styled from "styled-components";

export const ChartWrapper = styled.div`
  width: 100vw;
  min-height: 10vh;
  position: absolute;
  bottom: 0 !important;
  display: flex;
  background: rgb(246, 245, 240);
  background: linear-gradient(
    180deg,
    rgba(246, 245, 240, 0.3617822128851541) 0%,
    rgba(21, 21, 21, 0.7035189075630253) 0%,
    rgba(21, 21, 21, 1) 100%
  );
  gap: 1rem;
  padding: 2rem 1rem 0.2rem 1rem;
  box-shadow: 0rem 0rem 15em 0.2em #fff;
  @media only screen and (max-width: 975px) {
    flex-direction: column;
  }
`;
