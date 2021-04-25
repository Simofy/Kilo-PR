import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { SimpleButton } from "../buttons/SimpleButton";
import { useAuth } from "../../contexts/AuthContext";
import Typography from "react-styled-typography";
import { AiOutlineUser } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { IconButton } from "../buttons/IconButton";
import { ProfilePopup } from "../profile/ProfilePopup";
import { Dropdown } from "../others/Dropdown";
import { useAppSelector } from "../../hooks";

const NavBar = styled.header`
  display: flex;
  width: 100%;
  min-height: 7vh;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  background: #000;

  box-shadow: 30px 0rem 50px #000;
  color: #fff;
`;

const GlobalCases = styled.div`
  display: flex;
  background: #000;
  min-height: 100%;
  color: #fff;
  border: 1px solid #fff;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const GlobalCasesContent = styled.div`
  padding: 1rem;
`;

const nf = Intl.NumberFormat();

export const Nav = (): JSX.Element => {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const { cases, deaths }: any = useAppSelector(
    (state) => state.chartData.globalCases
  );

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
      <h1>C19</h1>
      <GlobalCases>
        <GlobalCasesContent>
          <Typography variant="p" align="center">
            Global cases
          </Typography>
          <Typography variant="h2" color="red">
            {cases ? nf.format(cases) : ""}
          </Typography>
        </GlobalCasesContent>
        <GlobalCasesContent>
          <Typography variant="p" align="center">
            Deaths
          </Typography>
          <Typography variant="h2" color="red">
            {deaths ? nf.format(deaths) : ""}
          </Typography>
        </GlobalCasesContent>
      </GlobalCases>

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
