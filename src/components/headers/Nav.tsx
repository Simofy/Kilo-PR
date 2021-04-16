import React, { useState } from "react";
import styled from "styled-components";
import { primary } from "../../styles/colors";

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
  color: #fff;
`;

export const Nav = (): JSX.Element => {
  const username = localStorage.getItem("email") || "unknown";

  return (
    <NavBar>
      <h1>Covidinho</h1>

      <span>User: {username}</span>
    </NavBar>
  );
};
