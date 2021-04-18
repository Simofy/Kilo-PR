import React, { useState } from "react";
import { Input } from "../components/inputs/Input";
import styled from "styled-components";
import { PlayButton } from "../components/buttons/PlayButton";
import { Box } from "../components/wrappers/Box";
import { Link } from "react-router-dom";
import { StyledForm, ErrorMsg } from "./LoginFlow";

const SignUpWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignUpFlow = (): JSX.Element => {
  const [error] = useState("");

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <SignUpWrapper>
      <form onSubmit={submitForm} style={{ flex: "1", display: "flex" }}>
        <StyledForm>
          <Box mb="2rem">
            <h1>Sign up</h1>
          </Box>
          <Box pb="1rem">
            <label htmlFor="email">Email</label>
            <Input type="text" name="email" />
          </Box>
          <Box mb="0.5rem">
            <label htmlFor="password">Password</label>
            <Input type="password" name="password" />
          </Box>
          <Box mb="0.5rem">
            <label htmlFor="password2">Repeat password</label>
            <Input type="password" name="password2" />
          </Box>
          <Box>
            <ErrorMsg>{error}</ErrorMsg>
          </Box>
          <Box mb="1rem">
            <p>
              Already have an account? Sign in <Link to="/">here.</Link>
            </p>
          </Box>
          <PlayButton type="submit">Sign up</PlayButton>
        </StyledForm>
      </form>
    </SignUpWrapper>
  );
};
