import React from "react";
import styled from "styled-components";
import { primary } from "../../styles/colors";

interface INav {
  maxX: number;
  maxY: number;
  updatedTimes: number;
}

const NavBar = styled.header<INav>`
  display: flex;
  width: 100%;
  min-height: 7vh;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-between;
  background-color: ${primary};
  box-shadow: 30px 0rem 50px #000;
  margin-bottom: 3rem;
  color: #fff;
`;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #fff;
`;

export const Nav = ({
  maxX,
  maxY,
  updatedTimes,
}: {
  maxX: number;
  maxY: number;
  updatedTimes: number;
}): JSX.Element => {
  const username = localStorage.getItem("username");

  return (
    <NavBar maxX={maxX} maxY={maxY} updatedTimes={updatedTimes}>
      <h1>Colorize</h1>
      {maxX && maxY && updatedTimes && (
        <StatusWrapper>
          <span>maxX coord: {maxX}</span>
          <span>maxX coord: {maxX}</span>
          <span>Times updated: {updatedTimes}</span>
        </StatusWrapper>
      )}
      <span>User: {username}</span>
    </NavBar>
  );
};
