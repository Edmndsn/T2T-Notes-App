import React, { useState, useEffect, createContext, useContext } from "react";
import { auth, db, gProvider, fProvider } from "../../firebase-config.js";
import { getDoc, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
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
	// const provider = new GoogleAuthProvider();

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	// async function signInGoogle(navigate, setErrors) {
	// 	try {
	// 		const { user } = await signInWithPopup(auth, gProvider);
	// 		// ADD THE BELOW IF WANT TO
	// 		// const docRef = await getDoc(doc(db, "users", user.uid));
	// 		// if (!docRef.exists()) {
	// 		// 	createUserDetails(user.uid, user.email);
	// 		// }
	// 		navigate("/", { replace: true });
	// 	} catch {
	// 		setErrors({ email: "Failed to create an account" });
	// 	}
	// 	// setLoading(false);
	// }

	function handleGoogle(e) {
		e.preventDefault();
		signInWithPopup(auth, gProvider)
			.then((cred) => {
				console.log(cred);
				navigate("/", { replace: true });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function signInFacebook(e) {
		e.preventDefault();
		signInWithPopup(auth, fProvider)
			.then((result) => {
				console.log(result);
				// const user = result.user;
				// const credential = fProvider.credentialFromResult(result);
				// const accessToken = credential.accessToken;
			})
			.catch((error) => {
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
		const unsub = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});
		return unsub;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		signInFacebook,
		handleGoogle,
	};

	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	);
}
