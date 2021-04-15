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


h3 {
    line-height: 34px;
}
`;
