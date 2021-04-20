import React, { useEffect } from "react";
import { Home } from "./pages/Home";
import { CovidMap } from "./pages/CovidMap";
import { Route, RouteProps, Redirect, useHistory } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { SignUpFlow } from "./containers/SignUpFlow";
import { useAuth } from "./contexts/AuthContext";

const PrivateRoute = ({
  children,
  ...props
}: React.PropsWithChildren<RouteProps>) => {
  const { currentUser } = useAuth();

  if (!currentUser && currentUser == null) return <Redirect to="/" />;
  return <Route {...props}>{children}</Route>;
};

export const App = (): JSX.Element => {
  const currentUser = useAuth();
  const history = useHistory();

  useEffect(() => {
    currentUser && history.push("/covidmap");
  }, [currentUser]);

  return (
    <>
      <GlobalStyle />
      <Route path="/" component={Home} exact />
      <PrivateRoute path="/covidmap" component={CovidMap} exact />
      <Route path="/signup" component={SignUpFlow} exact />
    </>
  );
};
