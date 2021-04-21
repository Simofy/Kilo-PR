import React, { useEffect } from "react";
import { AuthWrapper } from "../components/wrappers/AuthWrapper";
import { LoginFlow } from "../containers/LoginFlow";
import { HomePresentation } from "../layouts/HomePresentation";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { locationsCollection } from "../config/databse";

export const Home = (): JSX.Element => {
  const { currentUser } = useAuth();
  const history = useHistory();

  const testFirestore = () => {
    const data = {
      country: "Lithuania",
      iso2: "LT",
      latitude: 55.1736,
      longitude: 23.8948,
    };
    locationsCollection
      .doc("23523525")
      .set(data)
      .then(() => {
        console.log("created");
      })
      .catch(() => {
        console.log("something went wrroooong");
      });
  };

  useEffect(() => {
    currentUser ? history.push("/covidmap") : history.push("/");
    testFirestore();
  }, [currentUser]);
  return (
    <AuthWrapper>
      <HomePresentation>
        <h1>Hello there!</h1>
        <h3 style={{ textAlign: "center" }}>
          Get live data about <br /> Covid-19 with no worries
        </h3>
        <div />
      </HomePresentation>
      <LoginFlow />
    </AuthWrapper>
  );
};
