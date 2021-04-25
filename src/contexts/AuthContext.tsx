import React, { useContext, useState, useEffect, SetStateAction } from "react";
import { postLocationToFirestore } from "../helpers/firestore";
import { formatLocation } from "../helpers/formatLocation";
import Geocode from "react-geocode";
import { ActionTypes } from "../state/action-types";
import { useDispatch } from "react-redux";
import { auth } from "../config/firebase";

const AuthContext = React.createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user?.uid);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect((): any => {
    if (currentUser && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function ({
        coords: { latitude, longitude },
      }) {
        Geocode.fromLatLng(latitude.toString(), longitude.toString()).then(
          (response) => {
            const address = formatLocation(response);
            dispatch({
              type: ActionTypes.GET_CHART_DATA,
              payload: address.countryCode,
            });
            postLocationToFirestore(
              address.country,
              address.countryCode,
              latitude,
              longitude,
              currentUser.uid
            );
          },
          (error) => {
            console.error(error);
          }
        );
      });
    }
    return dispatch({ type: ActionTypes.GET_CHART_DATA, payload: "LT" });
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
