import React from "react";
import { AuthWrapper } from "../components/wrappers/AuthWrapper";
import { LoginFlow } from "../containers/LoginFlow";

export const Home = (): JSX.Element => {
  return (
    <AuthWrapper>
      <LoginFlow />
    </AuthWrapper>
  );
};
