import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { primary } from "../../styles/colors";
import { ProfileButton } from "../buttons/Button";
import { useAuth } from "../../contexts/AuthContext";
import Typography from "react-styled-typography";
import { AiOutlineUser } from "react-icons/ai";
import { useHistory } from "react-router-dom";

interface IProfilePopup {
  driveIn: boolean;
}

const NavBar = styled.header`
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

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const DropDown = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfilePopup = styled.div<IProfilePopup>`
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  min-height: 150px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffff;
  border-radius: 0.5rem;
  color: #000;
  padding: 0.5rem 1rem;
  gap: 1rem;
  transform: translateY(25%);
  transition: 0.3s ease-in-out;
  opacity: 0;
  z-index: -1;
  ${({ driveIn }) =>
    driveIn &&
    css`
      opacity: 1;
      z-index: 50;
    `}
`;

const SimpleButton = styled.button`
  background: none;
  border: none;
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: #ddd;
  }
`;

export const Nav = (): JSX.Element => {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const [popupActive, setPopUpActive] = useState(false);
  const history = useHistory();

  const handleMouseEnter = useCallback(() => {
    setPopUpActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPopUpActive(false);
  }, []);

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <NavBar>
      <h1>Covidinho</h1>
      <DropDown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <IconButton>
          <AiOutlineUser size={30} color="#fff" />
        </IconButton>
        <ProfilePopup driveIn={popupActive}>
          <Typography variant="h6">User: {currentUser.email} </Typography>
          <SimpleButton>Reset password</SimpleButton>
          <SimpleButton onClick={handleLogout}>Log out</SimpleButton>
        </ProfilePopup>
      </DropDown>
    </NavBar>
  );
};
