import "./App.css";
import React from "react";
import Notes from "./components/Notes/Notes";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup"
import NoMatch from "./components/NoMatch";
import { LoginContext } from "./components/Context/NavContext";
import { db } from "./firebase-config.js";
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, getDoc, updateDoc } from "firebase/firestore";

export default function App() {
  //Collection Ref
// const colRef = collection(db, "Notes");

// const q = query(colRef, where("name", "==", "exampleName"), orderBy('name', 'asc'))

// // get collection data
// // getDocs(colRef)
// // .then(snapshot => {
// //   let notes = []
// //   snapshot.docs.forEach((doc) => {
// //     books.push({ ...doc.data(), id: doc.id })
// //     console.log(notes)
// //   })
// // })
// // .catch(err => {
// //   console.log(err.message)
// // })

// // real time collection data
// onSnapshot(q, (snapshot) => {
//   let notes = []
//   snapshot.docs.forEach((doc) => {
//     notes.push({ ...doc.data(), id: doc.id })
    
// })
// console.log(notes)
// })

// //add documents
// const addNoteForm = document.querySelector('.add')
// addNoteForm.addEventListener('submit', (event) => {
//   event.preventDefault()

//   addDoc(colRef, {
//     name: addNoteForm.name.value,
//     email: addNoteForm.email.value,
//     title: addNoteForm.title.value,
//     message: addNoteForm.message.value
//   })
//   .then(() => {
//     addNoteForm.requestFullscreen()
//   })
// })

// // delete documents
// const deleteNoteForm = document.querySelector('.delete')
// deleteNoteForm.addEventListener('submit', (event) => {
//   event.preventDefault()

//   const docRef = doc(db, 'notes', deleteNoteForm.id.value)
//   deleteDoc(docRef)
//   .then(() => {
//     deleteNoteForm.reset()
//   })
// })

// //fetching docs
// // const docRef = doc(db, 'notes', 'insert note id')
// // getDoc(docRef)
// // .then((doc) => {
// //   console.log(doc.data(), doc.id)
// // })

// //fetching docs
// onSnapshot(docRef, (doc) => {
//   console.log(doc.data(), doc.id)
// })

// //updating docs
// const updateForm = document.querySelector('.update')
// updateForm.addEventListener('submit', (event) => {
//   event.preventDefault()

//   const docRef = doc(db, 'notes', updateForm.id.Value)
//   updateDoc(docRef, {
//     name: 'updated name'  
//   })
//   .then(() => {
//     updateForm.reset()
//   })
// })
  
  
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
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Routes>
    </div>
  );
}
