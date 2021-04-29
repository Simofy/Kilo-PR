import firebase from "firebase/app";
import React, { useContext, useEffect, useState } from "react";
import Geocode from "react-geocode";
import { useDispatch } from "react-redux";
import { auth, Providers } from "../config/firebase";
import { postLocationToFirestore } from "../helpers/firestore";
import { formatLocation } from "../helpers/formatLocation";
import { ActionTypes } from "../state/action-types";

type User = firebase.User;

interface IContextValues {
  currentUser?: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<firebase.auth.UserCredential>;
  signInWithGithub: () => Promise<firebase.auth.UserCredential>;
}

const AuthContext = React.createContext<IContextValues>({} as any);

export const useAuth = (): IContextValues => {
  return useContext(AuthContext);
};

export const AuthProvider = ({
  children
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>();
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

  const resetPassword = (email: string) => {
    return auth.sendPasswordResetEmail(email);
  };

  const signInWithGoogle = async () => {
    return auth.signInWithPopup(Providers.google);
  };

  const signInWithGithub = async () => {
    return auth.signInWithPopup(Providers.github);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function ({
        coords: { latitude, longitude }
      }) {
        Geocode.fromLatLng(latitude.toString(), longitude.toString()).then(
          (response) => {
            const address = formatLocation(response);
            dispatch({
              type: ActionTypes.SET_COUNTRY,
              payload: address.countryCode
            });
            dispatch({
              type: ActionTypes.GET_CHART_DATA
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
    dispatch({ type: ActionTypes.SET_COUNTRY, payload: "LT" });
    dispatch({ type: ActionTypes.GET_CHART_DATA });
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    signInWithGoogle,
    signInWithGithub
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
