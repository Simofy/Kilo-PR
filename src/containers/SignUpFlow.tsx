import React, { useCallback, useState } from "react";
import { Input } from "../components/inputs/Input";
import styled from "styled-components";
import { Button } from "../components/buttons/Button";
import { Box } from "../components/wrappers/Box";
import { Link } from "react-router-dom";
import { StyledForm, ErrorMsg } from "./LoginFlow";
import { auth } from "../config/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUpWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignUpFlow = (): JSX.Element => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();

  const submitForm = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      const {
        target: {
          email: { value: email },
          password: { value: password },
        },
      }: any = e;

      try {
        setError("");
        setLoading(true);
        await signup(email, password);
        history.push("/");
      } catch (err) {
        console.log(err);

        setError("Failed to create an account");
      }

      setLoading(false);
    },
    []
  );

  return (
    <SignUpWrapper>
      <form onSubmit={submitForm} style={{ flex: "1", display: "flex" }}>
        <StyledForm>
          <Box mb="2rem">
            <h1>Sign up</h1>
          </Box>
          <Box pb="1rem">
            <label htmlFor="email">Email</label>
            <Input type="text" name="email" required />
          </Box>
          <Box mb="0.5rem">
            <label htmlFor="password">Password</label>
            <Input type="password" name="password" required />
          </Box>

          <Box>
            <ErrorMsg>{error}</ErrorMsg>
          </Box>
          <Box mb="1rem">
            <p>
              Already have an account? Sign in <Link to="/">here.</Link>
            </p>
          </Box>
          <Button type="submit" disabled={loading}>
            Sign up
          </Button>
        </StyledForm>
      </form>
    </SignUpWrapper>
  );
};
