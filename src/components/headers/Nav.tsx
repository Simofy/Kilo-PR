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
import { Box } from "../wrappers/Box";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../state/action-types";
import Loader from "react-loader-spinner";
import AnimatedNumber from "react-animated-numbers";

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
  color: #fff;
  border: 1px solid #fff;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const GlobalCasesContent = styled.div`
  padding: 0.5rem;
`;

const GlobalCasesContentWrapper = styled.div`
  display: flex;
  background: #000;
`;

const nf = Intl.NumberFormat();

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
      config={{ tension: 89, friction: 40 }}
      onStart={() => console.log("onStart")}
      onFinish={() => console.log("onFinish")}
      animationType={"calm"}
    />
  );

  const animatedCases = (
    <AnimatedNumber
      animateToNumber={cases}
      includeComma
      config={{ tension: 89, friction: 40 }}
      onStart={() => console.log("onStart")}
      onFinish={() => console.log("onFinish")}
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
            <Typography variant="h2" color="red">
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
            <Typography variant="h2" color="red">
              {deaths ? (
                animatedDeaths
              ) : (
                <Loader type="Puff" width={10} height={10} color="#fff" />
              )}
            </Typography>
          </GlobalCasesContent>
        </GlobalCasesContentWrapper>
        <Box pl="0.5rem" pb="0.5rem">
          <SimpleButton color="#fff" onClick={toggleModal}>
            Show all countries
          </SimpleButton>
        </Box>
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
