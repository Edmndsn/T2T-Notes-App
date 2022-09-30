import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainLoginImage from "../../images/login-image.svg";
import logo from "../../images/logo.svg";
import googleLogo from "../../images/google-logo.svg";
import facebookLogo from "../../images/facebook-logo.svg";
import "./Login.css";
import { useAuth } from "../Context/AuthContext";
// import {
// 	signInWithEmailAndPassword,
// 	setPersistence,
// 	browserSessionPersistence,
// 	onAuthStateChanged,
// 	signInWithPopup,
// } from "firebase/auth";
// import { auth, gProvider, fProvider } from "../../firebase-config";

export default function Login() {
	const { login, signInFacebook, handleGoogle } = useAuth();
	const navigate = useNavigate();

	const [details, setDetails] = useState({
		email: "",
		password: "",
	});
	// ADD GOOGLE AND FACEBOOK SIGNUP!!!!!

	const [errorMessage, setErrorMessage] = useState("");

	// function validateForm() {
	//   return details.email.length > 0 && details.password.length > 0;
	// }

	function handleChange(event) {
		const { name, value } = event.target;
		setDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			setErrorMessage("");
			// setLoading(true);
			await login(details.email, details.password);
			navigate("/");
		} catch (error) {
			if (error.code === "auth/user-not-found") {
				setErrorMessage("User not found");
			} else if (error.code === "auth/wrong-password") {
				setErrorMessage("Wrong Password");
			} else {
				setErrorMessage("Something went wrong");
			}
		}
	}

	// function handleGoogle(e) {
	// 	e.preventDefault();
	// 	signInWithPopup(auth, provider)
	// 		.then((cred) => {
	// 			console.log(cred);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }

	// function handleGoogle(e) {
	// 	e.preventDefault();
	// 	signInWithPopup(auth, gProvider)
	// 		.then((cred) => {
	// 			sessionStorage.setItem("Auth Token", auth.currentUser.accessToken);
	// 			sessionStorage.setItem("uid", auth.currentUser.uid);
	// 			sessionStorage.setItem("email", auth.currentUser.email);
	// 			navigate("/");
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }

	function handleFacebook(e) {
		e.preventDefault();
		signInFacebook(e);
	}

	return (
		<div className="login-container">
			<div className="image-half">
				<div className="image-half-content">
					<div className="app-logo-container">
						<img src={logo} className="app-logo" alt="logo" />
						<span>Notes App</span>
					</div>
					<img src={mainLoginImage} className="landing-image" alt="landing" />
				</div>
			</div>
			<div className="form-half">
				<div className="form-container">
					<h2 className="login-title">Account Login</h2>
					<form className="login-form" onSubmit={handleSubmit}>
						<button className="account-button" onClick={handleGoogle}>
							<img src={googleLogo} alt="google" />
							Google Account
						</button>
						<button className="account-button" onClick={handleFacebook}>
							<img src={facebookLogo} alt="facebook" />
							Facebook Account
						</button>
						<div className="divider">
							<p>Or</p>
						</div>
						<div className="form-element span-two">
							<div className="label-container">
								<label htmlFor="email">Email address</label>
								<p
									className={`${
										errorMessage === "User not found" ? "visible" : ""
									}`}>
									{errorMessage}
								</p>
							</div>
							<input
								className="span-two"
								type="text"
								name="email"
								id="email"
								value={details.email}
								onChange={handleChange}
								required></input>
						</div>
						<div className="form-element span-two">
							<div className="label-container">
								<label htmlFor="password">Password</label>
								<p
									className={`${
										errorMessage === "Wrong Password" ? "visible" : ""
									}`}>
									{errorMessage}
								</p>
							</div>
							<input
								className="span-two"
								type="password"
								name="password"
								id="password"
								value={details.password}
								onChange={handleChange}
								required></input>
						</div>
						<button className="login-button span-two" onClick={handleSubmit}>
							Login
						</button>
					</form>
					<label className="sign-up">
						Don't have an account?&nbsp;<Link to="/signup">Sign up here</Link>
					</label>
				</div>
			</div>
		</div>
	);
}
