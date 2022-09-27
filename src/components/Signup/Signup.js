import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainSignupImage from "../../images/signup-image.svg";
import logo from "../../images/logo.svg";
import googleLogo from "../../images/google-logo.svg";
import facebookLogo from "../../images/facebook-logo.svg";
import "./Signup.css";
import { useAuth } from "../Context/AuthContext.js";

export default function Signup() {
	const { signup } = useAuth();
	const navigate = useNavigate();
	const [details, setDetails] = useState({
		email: "",
		password: "",
	});

	const [isError, setIsError] = useState({
		email: false,
		password: false,
	});

	const [errorMessage, setErrorMessage] = useState("");

	function emailChecker() {
		if (details.email !== "")
			setIsError((prevError) => ({
				...prevError,
				email: !/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(details.email),
			}));
	}

	function passwordChecker() {
		if (details.password !== "")
			setIsError((prevError) => ({
				...prevError,
				password: details.password.length < 6,
			}));
	}

	useEffect(() => {
		emailChecker();
		passwordChecker();
	}, [details]);

	function handleChange(event) {
		const { name, value } = event.target;
		setDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		if (!errorMessage.email && !errorMessage.password)
			try {
				setErrorMessage("");
				await signup(details.email, details.password);
				navigate("/", { replace: true });
			} catch {
				setErrorMessage("Sign up failed, please try again");
			}
	}

	return (
		<div className="login-container">
			<div className="image-half">
				<div className="image-half-content">
					<div className="app-logo-container">
						<img src={logo} className="app-logo" alt="logo" />
						<span>Notes App</span>
					</div>
					<img className="landing-image" src={mainSignupImage} alt="landing" />
				</div>
			</div>

			<div className="form-half">
				<div className="form-container">
					<h2 className="login-title">Sign up</h2>
					<label className="signup-text">
						If you are already a member you can log in with your email address
						and password.
					</label>
					<form className="login-form">
						<button className="account-button">
							<img src={googleLogo} alt="google" />
							Google Account
						</button>
						<button className="account-button">
							<img src={facebookLogo} alt="facebook" />
							Facebook Account
						</button>
						<div className="divider">
							<p>Or</p>
						</div>

						<div className="form-element span-two">
							<div className="label-container">
								<label htmlFor="email">Email address</label>
								<p className={isError.email || errorMessage ? "visible" : ""}>
									{errorMessage || "Email address invalid"}
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
									className={isError.password || errorMessage ? "visible" : ""}>
									{errorMessage || "Password must be atleast 6 characters long"}
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
							Sign up
						</button>
					</form>
					<label className="sign-up">
						Already have an account?&nbsp;
						<Link to="/login">Log in here</Link>
					</label>
				</div>
			</div>
		</div>
	);
}
