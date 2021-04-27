import React, { useContext, useState, useEffect, SetStateAction } from "react";
import { postLocationToFirestore } from "../helpers/firestore";
import { formatLocation } from "../helpers/formatLocation";
import Geocode from "react-geocode";
import { ActionTypes } from "../state/action-types";
import { useDispatch } from "react-redux";
import { auth, Providers } from "../config/firebase";
import firebase from "firebase/app";

type User = firebase.User;

interface IContextValues {
  currentUser: User | null;
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
}

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

  const resetPassword = (email: string) => {
    return auth.sendPasswordResetEmail(email);
  };

  const signInWithGoogle = async () => {
    firebase
      .auth()
      .signInWithPopup(Providers.google)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(user);
      })
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
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
              type: ActionTypes.SET_COUNTRY,
              payload: address.countryCode,
            });
            dispatch({
              type: ActionTypes.GET_CHART_DATA,
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
