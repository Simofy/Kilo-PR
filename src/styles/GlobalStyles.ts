import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
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
  right: 1em;
  top: 0.75em;
  @media only screen and (max-width: 600px) {
  display: none;
}
}

.search input {
  padding: 0.85rem 0.5rem;
  font-size: 0.9rem;
  transform: translateX(-50%);
width: 100%;
border: none;
box-shadow: 1rem 0px 7rem 0.1rem #000;
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
`;
