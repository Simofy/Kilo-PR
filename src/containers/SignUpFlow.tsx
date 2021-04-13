import React, { useState } from "react";
import { Input } from "../components/inputs/Input";
import styled from "styled-components";
import { PlayButton } from "../components/buttons/PlayButton";
import { Box } from "../components/wrappers/Box";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { StyledForm, ErrorMsg } from "./LoginFlow";

const emailPattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

const SignUpWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignUpFlow = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Sorry to mention, but entered passwords does not match.");
    } else if (!email.length || !password.length || !password2.length) {
      setError("Please fill in all the fields.");
    } else if (!emailPattern.test(email)) {
      setError("Please enter valid email address.");
    } else {
      history.push("/game");
    }
  };

  return (
    <SignUpWrapper>
      <form
        onSubmit={(e) => submitForm(e)}
        style={{ flex: "1", display: "flex" }}
      >
        <StyledForm>
          <Box mb="2rem">
            <h1>Sign up</h1>
          </Box>
          <Box pb="1rem">
            <label>Email</label>
            <Input type="text" onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box mb="0.5rem">
            <label htmlFor="">Password</label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mb="0.5rem">
            <label htmlFor="">Repeat password</label>
            <Input
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
            />
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
