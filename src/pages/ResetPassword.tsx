import React, { useCallback, useState } from "react";
import { Input } from "../components/inputs";
import { Button } from "../components/buttons";
import { Box } from "../components/wrappers";
import { Link } from "react-router-dom";
import { StyledForm } from "../components/forms";
import { useAuth } from "../contexts/AuthContext";
import { SignUpWrapper } from "../components/wrappers";
import { ErrorMsg } from "../components/errors";
import Loader from "react-loader-spinner";

export const ResetPassword = (): JSX.Element => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const submitForm = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      const {
        currentTarget: {
          email: { value: email },
        },
      } = e;

      try {
        setError("");
        setMessage("Please check your email for further action.");
        setLoading(true);
        await resetPassword(email);
      } catch (err) {
        setError(err.message);
        setMessage("");
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
            <h1>Reset password</h1>
          </Box>
          <Box pb="0.5rem">
            <label htmlFor="email">Email</label>
            <Input type="email" name="email" required />
          </Box>

          <Box>
            <ErrorMsg>{error}</ErrorMsg>
          </Box>

          <Box mb="1rem">
            {message && <p style={{ color: "green" }}>{message}</p>}
            <p>
              Go to <Link to="/">log in.</Link>
            </p>
          </Box>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader type="Puff" height={15} width={15} color="#fff" />
            ) : (
              "Reset"
            )}
          </Button>
        </form>
      </StyledForm>
    </SignUpWrapper>
  );
};
