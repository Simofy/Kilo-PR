import React, { useState, useRef } from "react";
import { Input } from "../components/inputs/Input";
import styled from "styled-components";
import { PlayButton } from "../components/buttons/PlayButton";
import { Box } from "../components/wrappers/Box";
import { Link } from "react-router-dom";

export const StyledForm = styled.div`
  min-width: 95%;
  padding: 2rem;
  border: 1px solid #ddd;
  margin: auto;
  min-width: 22rem;
  @media only screen and (max-width: 500px) {
    width: 100% !important;
  }
`;

export const ErrorMsg = styled.p`
  color: #ff0000;
  font-size: 12px;
  padding-bottom: 0.2rem;
`;

export const LoginFlow = (): JSX.Element => {
  const [error, setError] = useState("");

  const ControlledInput = (props: any) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return <Input ref={inputRef} {...props} />;
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={(e) => submitForm(e)}
      style={{ flex: "1", display: "flex", padding: "0 1rem" }}
    >
      <StyledForm>
        <Box mb="2rem">
          <h1>Sign in</h1>
        </Box>
        <label htmlFor="email">Email</label>
        <Input type="text" name="email" />
        <Box mb="0.5rem">
          <label htmlFor="password">Password</label>
          <ControlledInput type="password" name="password" />
        </Box>
        <Box>
          <ErrorMsg>{error}</ErrorMsg>
        </Box>
        <Box mb="1rem">
          <p>
            Don`t have account? Sign up <Link to="/signup">here.</Link>
          </p>
        </Box>
        <PlayButton type="submit">Sign in</PlayButton>
      </StyledForm>
    </form>
  );
};
