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
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  z-index: 10;
}

.search input {
  padding: 0.5rem;
  font-size: 1.5rem;
  width: 100%;
}

.locate {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  z-index: 10;
}
.locate img {
  width: 30px;
  cursor: pointer;
}


h3 {
    line-height: 34px;
}
`;
