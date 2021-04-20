import React, { useState, useCallback } from "react";
import { Input } from "../components/inputs/Input";
import styled from "styled-components";
import { Button } from "../components/buttons/Button";
import { Box } from "../components/wrappers/Box";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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

        await login(email, password);

        history.push("/covidmap");
      } catch (err) {
        console.log(err);
        setError("Ooops, something went wrong.");
      }
      setLoading(false);
    },
    []
  );

  return (
    <form
      onSubmit={submitForm}
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
          <Input type="password" name="password" />
        </Box>
        <Box>
          <ErrorMsg>{error}</ErrorMsg>
        </Box>
        <Box mb="1rem">
          <p>
            Don`t have account? Sign up <Link to="/signup">here.</Link>
          </p>
        </Box>
        <Button type="submit" disabled={loading}>
          Sign in
        </Button>
      </StyledForm>
    </form>
  );
};
