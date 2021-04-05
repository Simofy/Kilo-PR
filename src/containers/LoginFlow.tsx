import React, { useState } from "react";
import { Input } from "../components/inputs/Input";
import styled from "styled-components";
import { PlayButton } from "../components/buttons/PlayButton";
import { Box } from "../components/wrappers/Box";
import { useHistory } from "react-router-dom";
import { BlockPicker } from "react-color";

const StyledForm = styled.div`
  min-width: 28rem;
  padding: 2rem;
  border: 1px solid #ddd;
  margin: auto;
  width: fit-content;
`;

const H3 = styled.h3``;

export const LoginFlow = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [pickedColor, setPickedColor] = useState("#d9e3f0");

  const history = useHistory();

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length) {
      localStorage.setItem("username", username);
      localStorage.setItem("color", pickedColor);
      history.push("/game");
    }
  };

  const handleChangeComplete = (color: any) => {
    setPickedColor(color.hex);
  };

  return (
    <form
      onSubmit={(e) => submitForm(e)}
      style={{ flex: "1", display: "flex" }}
    >
      <StyledForm>
        <Box pb="1rem">
          <H3>Enter username</H3>
        </Box>
        <Box pb="1rem">
          <Input onChange={(e) => setUsername(e.target.value)} />
        </Box>
        <Box pb="1rem">Pick a color:</Box>
        <Box pb="1rem">
          <BlockPicker
            color={pickedColor}
            onChangeComplete={handleChangeComplete}
          />
        </Box>
        <PlayButton type="submit">Play Game</PlayButton>
      </StyledForm>
    </form>
  );
};
