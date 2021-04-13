import React, { useState } from "react";
import styled from "styled-components";
import { primary } from "../../styles/colors";
import { CirclePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";

interface INav {
  maxX?: number;
  maxY?: number;
  updatedTimes?: number;
}

const NavBar = styled.header<INav>`
  display: flex;
  width: 100%;
  min-height: 7vh;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  background-color: ${primary};
  box-shadow: 30px 0rem 50px #000;
  margin-bottom: 3rem;
  color: #fff;
`;

export const Nav = (): JSX.Element => {
  const username = localStorage.getItem("email") || "boom";
  const [pickedColor, setPickedColor] = useState("");

  const handleChange = (e: { hex: string }) => {
    setPickedColor(e.hex);
  };

  return (
    <NavBar>
      <h1>Colorize</h1>

      <CirclePicker color={pickedColor} onChange={(e) => handleChange(e)} />
      <span>User: {username}</span>
    </NavBar>
  );
};
