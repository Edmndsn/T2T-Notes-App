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
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
	updateDocs,
	setDoc,
	onSnapshot,
	query,
	orderBy,
	serverTimestamp,
} from "firebase/firestore";

export default function Notes() {
	const { currentUser } = useAuth();
	const userId = currentUser.uid;
	const notesRef = collection(db, `${userId}-notes`);
	const orderedNotes = query(notesRef, orderBy("createdAt", "desc"));

	useEffect(() => {
		onSnapshot(orderedNotes, async () => {
			const data = await getDocs(orderedNotes);
			const notesArray = data.docs.map((doc) => doc.data());
			setNotes(notesArray);
		});
	}, []);
	const [notes, setNotes] = useState(() => []);

	const [currentNoteId, setCurrentNoteId] = useState(
		(notes[0] && notes[0].id) || ""
	);

	const [displaySidebar, setDisplaySidebar] = useState(true);

	const navigate = useNavigate();

	// Change route when new note added/deleted
	useEffect(() => {
		updateTitle();
		if (notes.length > 0) {
			navigate(notes[0].title);
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
			title: `Note-${notes.length}`,
			body: "Write your message here...",
			date: `${date}`,
			createdAt: serverTimestamp(),
		};
		const firstNotes = {
			...newNote,
			title: `Note-${notes.length + 1}`,
		};
		if (notes.length === 0) {
			await setDoc(doc(db, `${userId}-notes`, id), firstNotes);
			setCurrentNoteId(firstNotes.id);
		} else {
			await setDoc(doc(db, `${userId}-notes`, id), newNote);
			setCurrentNoteId(newNote.id);
		}
	};

	// look at title in this, not neccesary atm
	const updateNote = async (text) => {
		const userDoc = doc(db, `${userId}-notes`, currentNoteId);
		const update =
			typeof text === "string" ? { body: text } : { title: text.target.value };
		await updateDoc(userDoc, update);
	};

	async function updateTitle(note) {
		const colref = await doc(db, `${userId}-notes`, note.title);
		const colupdate = colref.map((note) => {
			return {
				title: "hi",
			};
		});
		await updateDoc(colref, colupdate);
	}

	const deleteNote = async (event, noteId) => {
		// event.stopPropagation();
		const userDoc = doc(db, `${userId}-notes`, noteId);
		await deleteDoc(userDoc);
	};

	function findCurrentNote() {
		return (
			notes.find((note) => {
				return note.id === currentNoteId;
			}) || notes[0]
		);
	}

	return (
		<>
			{notes.length > 0 ? (
				<>
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
						{notes.length > 0 && (
							<>
								<Editor
									currentNote={findCurrentNote()}
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
