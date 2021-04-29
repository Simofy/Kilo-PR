import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { SimpleButton, IconButton, Button } from "../buttons";
import { useAuth } from "../../contexts/AuthContext";
import Typography from "react-styled-typography";
import { AiOutlineUser } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { ProfilePopup } from "../profile";
import { Dropdown } from "../others";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../state/action-types";
import Loader from "react-loader-spinner";
import AnimatedNumber from "react-animated-numbers";
import { secondary } from "../../styles/colors";
import { Box } from "../wrappers";

const NavBar = styled.header`
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
  background: rgba(246, 245, 240, 0.6);
`;

const GlobalCases = styled.div`
  color: #fff;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const GlobalCasesContent = styled.div`
  padding: 0.5rem;
`;

const GlobalCasesContentWrapper = styled.div`
  display: flex;
  background: ${secondary};
`;

export const Nav = (): JSX.Element => {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const { cases, deaths }: any = useAppSelector(
    (state) => state.chartData.globalCases
  );

  const dispatch = useDispatch();

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

  const animatedDeaths = (
    <AnimatedNumber
      animateToNumber={deaths}
      includeComma
      delay={1000}
      config={{ tension: 89, friction: 40 }}
      animationType={"calm"}
    />
  );

  const animatedCases = (
    <AnimatedNumber
      animateToNumber={cases}
      includeComma
      delay={1000}
      config={{ tension: 89, friction: 40 }}
      animationType={"calm"}
    />
  );

  const toggleModal = useCallback(() => {
    dispatch({ type: ActionTypes.TOGGLE_MODAL });
  }, []);

  return (
    <NavBar>
      <h1>C19</h1>
      <GlobalCases>
        <GlobalCasesContentWrapper>
          <GlobalCasesContent>
            <Typography variant="p" align="center">
              Global cases
            </Typography>
            <Typography variant="h4">
              {cases ? (
                animatedCases
              ) : (
                <Loader type="Puff" width={10} height={10} color="#fff" />
              )}
            </Typography>
          </GlobalCasesContent>
          <GlobalCasesContent>
            <Typography variant="p" align="center">
              Deaths
            </Typography>
            <Typography variant="h4">
              {deaths ? (
                animatedDeaths
              ) : (
                <Loader type="Puff" width={10} height={10} color="#fff" />
              )}
            </Typography>
          </GlobalCasesContent>
        </GlobalCasesContentWrapper>
        <SimpleButton onClick={toggleModal}>Show all countries</SimpleButton>
      </GlobalCases>

      <Dropdown
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseEnter}
      >
        <IconButton>
          <AiOutlineUser size={30} />
        </IconButton>
        <ProfilePopup driveIn={popupActive}>
          <Typography variant="h6">User: {currentUser.email} </Typography>
          <Box mt="1rem">
            <Button onClick={handleLogout} width="100%">
              Log out
            </Button>
          </Box>
          {error && <Typography variant="h6">{error}</Typography>}
        </ProfilePopup>
      </Dropdown>
    </NavBar>
  );
};
