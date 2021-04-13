import React, { useState } from "react";
import { Input } from "../components/inputs/Input";
import styled from "styled-components";
import { PlayButton } from "../components/buttons/PlayButton";
import { Box } from "../components/wrappers/Box";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const StyledForm = styled.div`
  min-width: 28rem;
  padding: 2rem;
  border: 1px solid #ddd;
  margin: auto;
  width: fit-content;
`;

export const ErrorMsg = styled.p`
  color: #ff0000;
  font-size: 12px;
  padding-bottom: 0.2rem;
`;

export const LoginFlow = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.length) {
      localStorage.setItem("username", email);
      localStorage.setItem("password", password);
      history.push("/game");
    }
    setError("Please check if email and password are entered correctly.");
  };

  return (
    <form
      onSubmit={(e) => submitForm(e)}
      style={{ flex: "1", display: "flex" }}
    >
      <StyledForm>
        <Box mb="2rem">
          <h1>Sign in</h1>
        </Box>

        <Box pb="0.2rem">
          <label>Email</label>
        </Box>
        <Box pb="1rem">
          <Input type="text" onChange={(e) => setEmail(e.target.value)} />
        </Box>
        <Box mb="0.5rem">
          <label htmlFor="">Password</label>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
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
