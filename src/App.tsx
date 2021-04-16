import React from "react";
import { Home } from "./pages/Home";
import { CovidMap } from "./pages/CovidMap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { SignUpFlow } from "./containers/SignUpFlow";
import { MyChart } from "./containers/MyChart";
import { ReChart } from "./containers/ReChart";

export const App = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Router basename={process.env.PUBLIC_URL}>
        <Route path="/" component={Home} exact />
        <Route path="/game" component={CovidMap} exact />
        <Route path="/signup" component={SignUpFlow} exact />
        <Route path="/chart" component={ReChart} exact />
      </Router>
    </>
  );
};
