import React from "react";
import { useState, useEffect } from "react";
import Editor from "./Editor";
import Sidebar from "./Sidebar";
import Split from "react-split";
import { nanoid } from "nanoid";
import "./Notes.css";
import { useNavigate } from "react-router-dom";
import chevron from "../../images/chevron.png";
import { db } from "../../firebase-config";
import { useAuth } from "../Context/AuthContext";
import {
  addDoc,
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
  const userId = currentUser.uid;
  const [notes, setNotes] = useState(() => []);

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  const [displaySidebar, setDisplaySidebar] = useState(true);

  const navigate = useNavigate();

  // look to make more concise date format

  const notesRef = collection(db, `${userId}-notes`);
  const orderedNotes = query(notesRef, orderBy("createdAt", "desc"));

  useEffect(() => {
    onSnapshot(orderedNotes, async () => {
      const data = await getDocs(orderedNotes);
      const notesArray = data.docs.map(doc => doc.data());
      setNotes(notesArray);
    });
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      navigate(`${findCurrentNote().id}`);
    }
    if (notes.length === 0) {
      navigate("");
    }
  }, [notes]);

  async function createNewNote() {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const date = new Date();
    const newNote = {
      id: nanoid(),
      title: `Note #${notes.length + 1}`,
      body: "Compose an epic...",
      date: `${date}`,
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(db, `${userId}-notes`, newNote.id), newNote);
    setCurrentNoteId(newNote.id);
    // navigate(`${notes.id}`);
  }

  const updateNote = async text => {
    const userDoc = doc(db, `${userId}-notes`, currentNoteId);
    const update =
      typeof text === "string" ? { body: text } : { title: text.target.value };
    await updateDoc(userDoc, update);
  };


  // not working - logs out after deleting
  const deleteNote = async (event, noteId) => {
    event.stopPropagation();
    const userDoc = doc(db, `${userId}-notes`, noteId);
    await deleteDoc(userDoc);
  };

  function findCurrentNote() {
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
          <div>
            <button
              className={`chevron ${!displaySidebar ? "" : "closed"}`}
              onClick={() => setDisplaySidebar(prevState => !prevState)}
            >
              <img
                src={chevron}
                className={!displaySidebar ? "closed" : ""}
                alt=""
              />
            </button>
          </div>
          <Split sizes={[30, 70]} direction="horizontal" className="split">
            <Sidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              currentNoteId={currentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
              displaySidebar={displaySidebar}
            />

            {currentNoteId && notes.length > 0 && (
              <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
            )}
          </Split>
        </>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </>
  );
}
