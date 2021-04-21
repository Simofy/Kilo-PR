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
  top: 0.5rem;
  left: 50%;
  width: 100%;
  z-index: 10;
  max-width: 400px;
  
}

.search input {
  padding: 0.5rem;
  font-size: 0.9rem;
  transform: translateX(-50%);
width: 100%;
}



h3 {
    line-height: 34px;
}
`;
