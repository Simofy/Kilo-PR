import React from "react";
import { Home } from "./pages/Home";
import { Game } from "./pages/Game";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyles";

export const App = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/game" component={Game} exact />
      </Router>
    </>
  );
};
