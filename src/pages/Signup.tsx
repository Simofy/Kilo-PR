import React, { useCallback, useState } from "react";
import { Input } from "../components/inputs/Input";
import { Button } from "../components/buttons/Button";
import { Box } from "../components/wrappers/Box";
import { Link } from "react-router-dom";
import { StyledForm } from "../components/forms/StyledForm";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SignUpWrapper } from "../components/wrappers/SignUpWrapper";
import { ErrorMsg } from "../components/errors/ErrorMsg";
import Loader from "react-loader-spinner";

export const Signup = (): JSX.Element => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();

  const submitForm = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      const {
        currentTarget: {
          email: { value: email },
          password: { value: password },
          password2: { value: password2 },
        },
      } = e;

      if (password !== password2) {
        setError("Ooops, looks like your passwords does not match.");
        return;
      }

      try {
        setError("");
        setLoading(true);
        await signup(email, password);
        history.push("/");
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    },
    []
  );

  return (
    <SignUpWrapper>
      <StyledForm>
        <form onSubmit={submitForm}>
          <Box mb="2rem">
            <h1>Sign up</h1>
          </Box>
          <Box pb="1rem">
            <label htmlFor="email">Email</label>
            <Input type="email" name="email" required />
          </Box>
          <Box mb="1rem">
            <label htmlFor="password">Password</label>
            <Input type="password" name="password" required />
          </Box>
          <Box mb="0.5rem">
            <label htmlFor="password2">Confirm password</label>
            <Input type="password" name="password2" required />
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
            {loading ? (
              <Loader type="Puff" height={15} width={15} color="#fff" />
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </StyledForm>
    </SignUpWrapper>
  );
};
