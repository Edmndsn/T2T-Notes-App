import "./App.css";
import React from "react";
import Notes from "./components/Notes/Notes";
import { Routes, Route } from 'react-router-dom'
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";

export default function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='notes' element={<Notes />} />
      <Route path='contact' element={<Contact />} />

      
    </Routes>    
  );
}
