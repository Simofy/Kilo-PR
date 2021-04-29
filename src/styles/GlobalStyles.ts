import { createGlobalStyle } from "styled-components";
import { primary, secondary } from "./colors";

export const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    padding: 0 ;
    margin: 0 ;
    font-family: 'Open Sans', sans-serif;

}
body {
    font-size: 13px;
    overflow-x: hidden;
}
h1, h2, h3, h4, h5, h6 {
    font-family: 'Raleway', sans-serif;
}

.search {
  position: absolute;
  max-width: 400px;
  right: 4rem;
  top: 0.75em;
  @media only screen and (max-width: 600px) {
    right: 0.65rem;
    top: 3.5rem;

}
}

.search input {
  padding: 0.85rem 0.5rem;
  font-size: 0.9rem;
width: 100%;
border: none;
border-radius: 0.15rem;

}

h3 {
    line-height: 34px;
}

.gm-style .gm-style-iw-c {
  transform: translate(-50%, -140%)
}

.gm-style .gm-style-iw-t::after {
  display: none;
}

.gm-ui-hover-effect {
  display: none !important;
}

::placeholder {
  font-size: 12px;
}

.vaccine-chart {
  padding-left: 1rem !important;
  @media only screen and (max-width: 600px) {
    display: none;
  }
}

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 16px;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(odd){background-color: ${primary}; color: #000}

tr:nth-child(even){background-color: ${secondary}; color: #fff}

th {
  background-color: ${secondary};
  color: white;
}

.recharts-text, .recharts-cartesian-axis-tick-value {
  font-weight: 800 ;
}
`;
