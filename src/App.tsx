import React from "react";
import { Home } from "./pages/Home";
import { CovidMap } from "./pages/CovidMap";
import {
  Route,
  RouteProps,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { SignUpFlow } from "./containers/SignUpFlow";
import { useAuth } from "./contexts/AuthContext";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Table } from "./components/tables/Table";

const PrivateRoute = ({
  children,
  ...props
}: React.PropsWithChildren<RouteProps>) => {
  const { currentUser } = useAuth();

  if (!currentUser) return <Redirect to="/" />;
  return <Route {...props}>{children}</Route>;
};
export const App = (): JSX.Element => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <GlobalStyle />
      <Route path="/" component={Home} exact />
      <PrivateRoute path="/covidmap" component={CovidMap} exact />
      <Route path="/signup" component={SignUpFlow} exact />
      <Route path="/table" component={Table} exact />
    </Router>
  );
};
