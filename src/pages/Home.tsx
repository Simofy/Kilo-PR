import React from "react";
import { AuthWrapper } from "../components/wrappers/AuthWrapper";
import { LoginFlow } from "../containers/LoginFlow";
import { HomePresentation } from "../components/others/HomePresentation";

export const Home = (): JSX.Element => {
  return (
    <AuthWrapper>
      <HomePresentation>
        <h1>Hello there!</h1>
        <h3 style={{ textAlign: "center" }}>
          Play the most nonsense, <br />
          but colorfull game on the internet and win absolutely... nothing!
        </h3>
        <div />
      </HomePresentation>
      <LoginFlow />
    </AuthWrapper>
  );
};
