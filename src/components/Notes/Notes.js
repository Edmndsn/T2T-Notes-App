import React from "react";
import { useState, useEffect } from "react";
import Editor from "./Editor";
import Sidebar from "./Sidebar";
import Split from "react-split";
import { nanoid } from "nanoid";
import "./Notes.css";
import { useNavigate } from "react-router-dom";
import chevron from "../../images/chevron.png";

export default function Notes() {
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  const [displaySidebar, setDisplaySidebar] = useState(true);

  const navigate = useNavigate();
  const date = new Date();

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    if (notes.length > 0) {
      navigate(`${findCurrentNote().id}`);
    }
    if (notes.length === 0) {
      navigate("");
    }
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      title: `Note #${notes.length + 1}`,
      body: "Compose an epic...",
      date: `${date}`,
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
    // navigate(`${notes.id}`);
  }

  function updateNote(text) {
    // Put the most recently-modified note at the top
    setNotes(oldNotes => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId));
  }

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
