import React from "react";
import styled from "styled-components";
import { primary } from "../../styles/colors";

const NavBar = styled.header`
  display: flex;
  width: 100%;
  min-height: 5vh;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-between;
  background-color: ${primary};
  box-shadow: 30px 0rem 50px #000;
  margin-bottom: 3rem;
  color: #fff;
`;

export const Nav = (): JSX.Element => {
  const username = localStorage.getItem("username");

  return (
    <NavBar>
      <h1>Colorize</h1>
      <span>User: {username}</span>
    </NavBar>
  );
};
