import React, { useEffect } from "react";
import { AuthWrapper } from "../components/wrappers/AuthWrapper";
import { LoginFlow } from "../containers/LoginFlow";
import { HomePresentation } from "../layouts/HomePresentation";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export const Home = (): JSX.Element => {
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    currentUser ? history.push("/covidmap") : history.push("/");
  }, [currentUser]);
  return (
    <AuthWrapper>
      <HomePresentation>
        <h1>Hello there!</h1>
        <h3 style={{ textAlign: "center" }}>
          Get live data about <br /> Covid-19 with no worries
        </h3>
        <div />
      </HomePresentation>
      <LoginFlow />
    </AuthWrapper>
  );
};
