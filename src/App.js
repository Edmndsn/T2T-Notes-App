import "./App.css";
import React from "react";
import Notes from "./components/Notes/Notes";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import NoMatch from "./components/NoMatch";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="notes" element={<Notes />}>
          <Route path=":note" element={<Notes />} />
        </Route>
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
