import React from "react";
import { useState, useEffect } from "react";
import Editor from "./Editor";
import Sidebar from "./Sidebar";
import Split from "react-split";
import { nanoid } from "nanoid";
import "./Notes.css";
import { useNavigate } from "react-router-dom";
import chevron from "../../images/chevron.svg";
import { db } from "../../firebase-config";
import { useAuth } from "../Context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function Notes() {
  const { currentUser } = useAuth();
  const uid = currentUser && currentUser.uid;
  const navigate = useNavigate();
  const notesRef = currentUser && collection(db, "users", uid, "notes");
  const orderedNotes = query(notesRef, orderBy("createdAt", "desc"));
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [displaySidebar, setDisplaySidebar] = useState(true);

  useEffect(() => {
    if (currentUser) {
      onSnapshot(orderedNotes, async () => {
        const data = await getDocs(orderedNotes);
        const notesArray = data.docs.map(doc => doc.data());
        setNotes(notesArray);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (notes.length > 0 && !currentNoteId) {
      navigate(notes[0].title);
      setCurrentNoteId(notes[0].id);
    }
    if (notes.length > 0 && currentNoteId) {
      navigate(findCurrentNote());
    }
    if (notes.length === 0) {
      navigate("");
    }
  }, [notes]);

  const createNewNote = async () => {
    const date = new Date().toISOString().substring(0, 10);
    const id = nanoid();
    const newNote = {
      id: id,
      title: "New Note",
      body: "Write your message here...",
      date: `${date}`,
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(db, "users", uid, "notes", id), newNote);
    setCurrentNoteId(newNote.id);
  };

  const updateNote = async text => {
    const userDoc = doc(db, "users", uid, "notes", currentNoteId);
    const update =
      typeof text === "string" ? { body: text } : { title: text.target.value };
    await updateDoc(userDoc, update);
  };

  const handleDelete = async id => {
    await deleteDoc(doc(db, "users", uid, "notes", id));
  };

  function deleteNote() {
    handleDelete(currentNoteId);
  }

  function findCurrentNote(id) {
    return (
      notes.find(note => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <>
      {notes.length > 0 ? (
        <>
          <Split sizes={[30, 75]} direction="horizontal" className="split">
            <Sidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              currentNoteId={currentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
              displaySidebar={displaySidebar}
            />
            {notes.length > 0 && (
              <>
                <Editor
                  currentNote={findCurrentNote()}
                  setCurrentNoteId={setCurrentNoteId}
                  updateNote={updateNote}
                  chevron={chevron}
                  displaySidebar={displaySidebar}
                  setDisplaySidebar={setDisplaySidebar}
                />
              </>
            )}
          </Split>
        </>
      ) : (
        <div className="no-notes">
          <h2>You have no notes</h2>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </>
  );
}
