import styled from "styled-components";

interface IBox {
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;

  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  width?: string;
}

export const Box = styled.div<IBox>`
  padding-top: ${({ pt }) => `${pt}`};
  padding-right: ${({ pr }) => `${pr}`};
  padding-bottom: ${({ pb }) => `${pb}`};
  padding-left: ${({ pl }) => `${pl}`};

  margin-top: ${({ mt }) => `${mt}`};
  margin-right: ${({ mr }) => `${mr}`};
  margin-bottom: ${({ mb }) => `${mb}`};
  margin-left: ${({ ml }) => `${ml}`};
  width: ${({ width }) => `${width}`};
`;
