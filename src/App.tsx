import React from "react";
import { Home, CovidMap, Signup, ResetPassword } from "./pages";
import {
  Route,
  RouteProps,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useAuth } from "./contexts/AuthContext";
import { Table } from "./components/tables";

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
      <Route path="/signup" component={Signup} exact />
      <Route path="/table" component={Table} exact />
      <Route path="/reset_password" component={ResetPassword} exact />
    </Router>
  );
};
