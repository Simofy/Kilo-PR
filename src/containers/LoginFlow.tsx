import React, { useState } from "react";
import { Input } from "../components/inputs/Input";
import styled from "styled-components";
import { PlayButton } from "../components/buttons/PlayButton";
import { Box } from "../components/wrappers/Box";
import { useHistory } from "react-router-dom";

const StyledForm = styled.div`
  min-width: 28rem;
  padding: 2rem;
  border: 1px solid #000;
`;

const H3 = styled.h3``;

export const LoginFlow = (): JSX.Element => {
  const [username, setUsername] = useState("");

  const history = useHistory();

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length) {
      localStorage.setItem("username", username);
      history.push("/game");
    }
  };

  return (
    <form onSubmit={(e) => submitForm(e)}>
      <StyledForm>
        <Box pb="0.5rem">
          <H3>Enter username</H3>
        </Box>
        <Box pb="0.5rem">
          <Input onChange={(e) => setUsername(e.target.value)} />
        </Box>
        <PlayButton type="submit">Play Game</PlayButton>
      </StyledForm>
    </form>
  );
};
