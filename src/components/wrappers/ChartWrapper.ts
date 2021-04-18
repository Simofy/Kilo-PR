import styled from "styled-components";

interface IChartWrapper {
  display: boolean;
}

export const ChartWrapper = styled.div<IChartWrapper>`
  width: 100vw;
  min-height: 15vh;
  position: absolute;
  bottom: 0 !important;
  background: rgb(246, 245, 240);
  background: linear-gradient(
    180deg,
    rgba(246, 245, 240, 0.3617822128851541) 0%,
    rgba(21, 21, 21, 0.7035189075630253) 0%,
    rgba(21, 21, 21, 1) 100%
  );
  padding: 2rem;
  box-shadow: 0rem 0rem 15em 0.2em #fff;
  display: ${({ display }) => (display ? "block" : "none")};
  z-index: 2;
`;
