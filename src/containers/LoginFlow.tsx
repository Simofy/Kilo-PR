import React, { useState, useCallback } from "react";
import { Input } from "../components/inputs/Input";
import { ButtonGroup } from "../components/buttons/ButtonGroup";
import { Button } from "../components/buttons/Button";
import { Box } from "../components/wrappers/Box";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ErrorMsg } from "../components/errors/ErrorMsg";
import { StyledForm } from "../components/forms/StyledForm";
import Loader from "react-loader-spinner";

export const LoginFlow = (): JSX.Element => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const history = useHistory();

  const submitForm = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      const {
        currentTarget: {
          email: { value: email },
          password: { value: password },
        },
      } = e;

      try {
        setError("");

        setLoading(true);

        await login(email, password);

        history.push("/");
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    },
    []
  );

  return (
    <StyledForm style={{ margin: "auto" }}>
      <form onSubmit={submitForm}>
        <Box mb="2rem">
          <h1>Sign in</h1>
        </Box>
        <Box mb="1rem">
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" required />
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
            Don`t have account? Sign up <Link to="/signup">here.</Link>
          </p>
        </Box>
        <ButtonGroup>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader type="Puff" height={15} width={15} color="#fff" />
            ) : (
              "Sign in"
            )}
          </Button>
        </ButtonGroup>
      </form>
    </StyledForm>
  );
};
