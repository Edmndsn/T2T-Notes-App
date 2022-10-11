import React, { useState, useEffect, createContext, useContext } from "react";
import { auth, gProvider, fProvider } from "../../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function handleGoogle(e) {
    e.preventDefault();
    signInWithPopup(auth, gProvider)
      .then(cred => {
        console.log(cred);
        navigate("/", { replace: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleFacebook(e) {
    e.preventDefault();
    signInWithPopup(auth, fProvider)
      .then(result => {
        console.log(result);
        navigate("/", { replace: true });
        // const user = result.user;
        // const credential = fProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;
      })
      .catch(error => {
        console.log(error.message);
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = fProvider.credentialFromError(error);
        // ...
      });
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    handleFacebook,
    handleGoogle,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
