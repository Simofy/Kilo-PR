import React, { useState, useCallback, FormEvent } from "react";
import { Input } from "../components/inputs";
import { ButtonGroup, Button, IconButton } from "../components/buttons";
import { Box } from "../components/wrappers";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ErrorMsg } from "../components/errors";
import { StyledForm } from "../components/forms";
import Loader from "react-loader-spinner";
import Typography from "react-styled-typography";
import { VscGithub } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";

export const LoginFlow = (): JSX.Element => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle, signInWithGithub } = useAuth();

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

  const loginWithGithub = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await signInWithGithub();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await signInWithGoogle();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledForm style={{ margin: "auto" }}>
      <form onSubmit={submitForm}>
        <Box mb="1rem">
          <h1>Sign in</h1>
        </Box>
        <Box mb="1rem">
          <ButtonGroup>
            <IconButton onClick={loginWithGithub}>
              <VscGithub />
            </IconButton>
            <IconButton onClick={loginWithGoogle}>
              <FcGoogle />
            </IconButton>
          </ButtonGroup>
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
        <Box mb="0.2rem">
          <Typography variant="p">
            Don`t have an account? Sign up <Link to="/signup">here.</Link>
          </Typography>
        </Box>
        <Box mb="0.2rem">
          <Typography variant="p">
            Forgot your password? Reset <Link to="/reset_password">here.</Link>
          </Typography>
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
