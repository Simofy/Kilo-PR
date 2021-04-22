import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { primary } from "../../styles/colors";
import { SimpleButton } from "../buttons/SimpleButton";
import { useAuth } from "../../contexts/AuthContext";
import Typography from "react-styled-typography";
import { AiOutlineUser } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { IconButton } from "../buttons/IconButton";
import { ProfilePopup } from "../profile/ProfilePopup";
import { Dropdown } from "../others/Dropdown";

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
      <Dropdown
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseEnter}
      >
        <IconButton>
          <AiOutlineUser size={30} color="#fff" />
        </IconButton>
        <ProfilePopup driveIn={popupActive}>
          <Typography variant="h6">User: {currentUser.email} </Typography>
          <SimpleButton onClick={handleLogout}>Log out</SimpleButton>
          {error && <Typography variant="h6">{error}</Typography>}
        </ProfilePopup>
      </Dropdown>
    </NavBar>
  );
};

//          <SimpleButton>Change password</SimpleButton>
