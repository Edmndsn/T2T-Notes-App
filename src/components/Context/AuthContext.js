import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
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
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
