import React, { useState, useRef } from "react";
import { Input } from "../components/inputs/Input";
import styled from "styled-components";
import { PlayButton } from "../components/buttons/PlayButton";
import { Box } from "../components/wrappers/Box";
import { useHistory } from "react-router-dom";
import { BlockPicker } from "react-color";

const StyledForm = styled.div`
  min-width: 28rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  margin: auto;
  width: fit-content;
`;
const H3 = styled.h3``;

export const LoginFlow = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [pickedColor, setPickedColor] = useState("#d9e3f0");

  const xRef = useRef<HTMLInputElement | null>(null);
  const yRef = useRef<HTMLInputElement | null>(null);
  const widthRef = useRef<HTMLInputElement | null>(null);
  const heightRef = useRef<HTMLInputElement | null>(null);

  const history = useHistory();

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      xRef.current != null &&
      username &&
      yRef.current != null &&
      widthRef != null &&
      heightRef != null
    ) {
      localStorage.setItem("username", username);
      localStorage.setItem("color", pickedColor);

      localStorage.setItem(
        "boardParams",
        JSON.stringify({
          x: xRef.current?.value,
          y: yRef.current?.value,
          width: widthRef.current?.value,
          height: heightRef.current?.value,
        })
      );
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
        <Box>
          <H3>Set board coordinates</H3>
          <ExtendedInput type="number" placeholder="x-cord" ref={xRef} />
          <ExtendedInput type="number" placeholder="y-cord" ref={yRef} />
          <ExtendedInput type="number" placeholder="width" ref={widthRef} />
          <ExtendedInput type="number" placeholder="height" ref={heightRef} />
        </Box>
        <PlayButton type="submit">Play Game</PlayButton>
      </StyledForm>
    </form>
  );
};

const ExtendedInput = styled(Input)`
  width: 15%;
  text-align: left;
  font-size: 14px;
  margin: 5px;
`;
