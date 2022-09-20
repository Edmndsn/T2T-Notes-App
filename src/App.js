import "./App.css";
import React from "react";
import Notes from "./components/Notes/Notes";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import NoMatch from "./components/NoMatch";
import AuthProvider from "./components/Context/AuthContext";
import RequireAuth from "./components/RequireAuth.js";
import { useAuth } from "./components/Context/AuthContext";

export default function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Navbar />
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="notes"
            element={
              <RequireAuth>
                <Navbar />
                <Notes />
              </RequireAuth>
            }
          >
            <Route path=":note" element={<Notes />} />
          </Route>
          <Route
            path="contact"
            element={
              <RequireAuth>
                <Navbar />
                <Contact />
              </RequireAuth>
            }
          />

          <Route path="*" element={<NoMatch />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
