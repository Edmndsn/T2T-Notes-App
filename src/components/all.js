// // APP.JS
// import "./App.css";
// import AuthProvider from "./Contexts/RequireAuth";
// import Navbar from "./Components/Navbar/Navbar";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import Expenses from "./Components/Expenses/Expenses";
// import Settings from "./Components/Settings/Settings";
// import { Route, Routes } from "react-router-dom";
// import React from "react";
// import Signin from "./Components/Signin/Signin";
// import Signup from "./Components/Signup/Signup";
// import CreateExpense from "./Components/Expenses/CreateExpense";
// import Filters from "./Components/Expenses/Filters";

// export default function App() {
//   return (
//     <div className="App">
//       <AuthProvider>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Dashboard />} />

//           {/* add ternary to hide Expense if create-expense = true and nest inside*/}
//           <Route path="expenses" element={<Expenses />}>
//             <Route path="create-expense" element={<CreateExpense />} />
//           </Route>
//           <Route path="filters" element={<Filters />} />
//           <Route path="settings" element={<Settings />} />
//           <Route path="/signin" element={<Signin />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="*" element={<div>Page not found</div>} />
//         </Routes>
//       </AuthProvider>
//     </div>
//   );
// }

// //Navbar.js
// import React from "react";
// import {NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import {useAuth} from '../../Contexts/RequireAuth'
// import dashboardIcon from "../../images/dashboard-icon.svg";
// import expensesIcon from "../../images/expenses-icon.svg";
// import settingsIcon from "../../images/settings-icon.svg";
// import Logo from "../../images/Logo.svg";
// import logoutIcon from '../../images/logout-icon.svg';
// import "./Navbar.css";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const {currentUser, logout} = useAuth();
//   const [error, setError] = React.useState('');

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate('/signin');
//     } catch {
//       setError('Logout failed');
//     }
//   }

//   return (
//     <div className="nav-container">
//     <nav>
//       <img className="logo" src={Logo} />
//       <div className="nav-links">
//         <NavLink to="/" className="navlink-dashboard">
//           <img src={dashboardIcon} />
//           Dashboard
//         </NavLink>
//         <NavLink to="expenses" className="navlink-expenses">
//           <img src={expensesIcon} />
//           Expenses
//         </NavLink>
//         <NavLink to="settings" className="navlink-settings">
//           <img src={settingsIcon} /> Settings
//         </NavLink>
//       </div>

//     </nav>
//     <button
//       className="logout-button"
//       onClick={handleLogout}>
//       <img src={logoutIcon}/>
//       Log out
//     </button>
//     </div>
//   );
// }

// // Settings.js
// import React from "react";
// import { useState, useEffect } from "react";
// import { useAuth } from "../../Contexts/RequireAuth.js";
// import Pen from "../../images/Edit_icon.svg";
// import Mail from "../../images/Email_icon.svg";
// import Lock from "../../images/Lock_icon.svg";
// import Eye from "../../images/Eye_icon.svg";
// import "./settings.css";
// import {
//   updateProfile,
//   updateEmail,
//   updatePassword,
//   EmailAuthProvider,
//   reauthenticateWithCredential,
// } from "firebase/auth";

// export default function Settings() {
//   const { updateUser, updateUsersEmail, updateUsersPassword, userDetails } =
//     useAuth();
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setData({
//       firstName: userDetails.firstName,
//       lastName: userDetails.lastName,
//       dateOfBirth: userDetails.dateOfBirth,
//       mobileNumber: userDetails.mobileNumber,
//       email: userDetails.email,
//       password: "",
//       passwordConfirm: "",
//     });
//   }, [userDetails]);

//   const [editSettings, setEditSettings] = useState(false);

//   const [data, setData] = useState({
//     firstName: userDetails.firstName,
//     lastName: userDetails.lastName,
//     dateOfBirth: userDetails.dateOfBirth,
//     mobileNumber: userDetails.mobileNumber,
//     email: userDetails.email,
//     password: "",
//     passwordConfirm: "",
//   });
//   console.log(userDetails.email);
//   const [passwordInput, setPasswordInput] = useState("password");

//   async function handleSubmit(e) {
//     setError("");
//     e.preventDefault();
//     const {
//       firstName,
//       lastName,
//       dateOfBirth,
//       mobileNumber,
//       email,
//       password,
//       passwordConfirm,
//     } = data;

//     if (email) {
//       try {
//         await updateUsersEmail(email);
//         await updateUser({
//           firstName,
//           lastName,
//           dateOfBirth,
//           mobileNumber,
//           email,
//         });
//       } catch (err) {
//         setError("Something went wrong!");
//       }
//     }
//     if (password && password === passwordConfirm) {
//       try {
//         updateUsersPassword(password);
//       } catch {
//         setError("Something went wrong!");
//       }
//     }
//     setEditSettings(false);
//   }

//   function handleInput(e) {
//     const { name, value } = e.target;
//     setData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   }

//   return (
//     <div className="settings-container">
//       <nav className="navbar-container">
//         <h1 className="title">Settings</h1>
//         <button className="profile-btn">
//           {/* // <img src=PROFILE PIC/>  */}
//           <h3>NAME OF PROFILE-CHANGE</h3>
//         </button>
//       </nav>

//       <div className="main-container">
//         <h2 className="subtitle-acc">Account Information</h2>
//         <p className="subtitle-details">Update your account information</p>

//         <section className="personal-info">
//           <h2 className="subtitle-pers">Personal Information</h2>
//           <button
//             className="edit-btn"
//             onClick={e => {
//               setEditSettings(prev => !prev);
//               e.preventDefault();
//             }}
//           >
//             <img src={Pen} className="pen-icon" alt="" />
//             Edit
//           </button>
//         </section>

//         <form className="form-info">
//           <section className="form-wrap">
//             <div className="form-column">
//               <label className="label label-fname">First Name</label>
//               <input
//                 disabled={!editSettings}
//                 className="input input-fname"
//                 type="text"
//                 name="firstName"
//                 onChange={handleInput}
//                 value={data.firstName}
//                 placeholder={data.firstName}
//               />
//             </div>

//             <div className="form-column">
//               <label className="label label-lname">Last Name</label>
//               <input
//                 disabled={!editSettings}
//                 className="input input-lname"
//                 type="text"
//                 name="lastName"
//                 onChange={handleInput}
//                 placeholder={data.lastName}
//               />
//             </div>

//             <div className="form-column">
//               <label className="label label-date">Date of birth</label>
//               <input
//                 disabled={!editSettings}
//                 className="input input-date"
//                 type="date"
//                 name="dob"
//                 onChange={handleInput}
//                 placeholder={data.userBirth}
//               />
//             </div>

//             <div className="form-column">
//               <label className="label label-phone">Mobile Number</label>
//               <input
//                 disabled={!editSettings}
//                 className="input input-phone"
//                 name="phone"
//                 onChange={handleInput}
//                 placeholder={data.phoneNumber}
//               />
//             </div>
//           </section>

//           <label className="label-email">Email</label>
//           <div className="mail-container">
//             <img src={Mail} className="mail-icon" alt="" />
//             <input
//               disabled={!editSettings}
//               className="input-mail"
//               type="email"
//               name="email"
//               onChange={handleInput}
//               placeholder={data.userEmail}
//             />
//           </div>

//           <section className="form-wrap">
//             <div className="form-column">
//               <label className="label-pass">New Password</label>
//               <div className="pass-container">
//                 <img src={Lock} className="lock-icon" alt="" />
//                 <input
//                   disabled={!editSettings}
//                   className="pass-input"
//                   type={passwordInput}
//                   name="password"
//                   onChange={handleInput}
//                   placeholder="·······"
//                 />
//                 <button
//                   onClick={e => {
//                     setPasswordInput(prev =>
//                       prev === "password" ? "text" : "password"
//                     );
//                     e.preventDefault();
//                   }}
//                 >
//                   <img src={Eye} className="eye-icon" alt="" />
//                 </button>
//               </div>
//             </div>

//             <div className="form-column">
//               <label className="label-pass">Confirm Password</label>
//               <div className="pass-container">
//                 <img src={Lock} className="lock-icon" alt="" />
//                 <input
//                   disabled={!editSettings}
//                   className="pass-input"
//                   type={passwordInput}
//                   name="password"
//                   onChange={handleInput}
//                   placeholder="·······"
//                 />
//                 <button
//                  onClick={(e) => {
//                   setPasswordInput((prev) =>
//                     prev === 'password' ? 'text' : 'password'
//                   );
//                   e.preventDefault();
//                 }}
//                 >
//                   <img src={Eye} className="eye-icon" alt="" />
//                 </button>
//               </div>
//               <p>{error.password}</p>
//             </div>
//           </section>

//           <button
//             disabled={!editSettings}
//             onClick={(e) => handleSubmit(e)}
//             className="update-btn"
//           >
//             Update
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // Signin

// import React from 'react';
// import {useNavigate, Link} from 'react-router-dom';
// import {signInWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged} from 'firebase/auth';
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../../firebase-config";
// import {useAuth} from "../../Contexts/RequireAuth.js";
// import Logo from '../../images/Logo.svg'
// import google from '../../images/Google.svg'
// import vector from '../../images/Vector.svg'
// import Main from '../../images/Intro_img.svg'
// import './signin.css'

// export default function Signin() {
//     const [user, setUser] = React.useState({});
//     const navigate = useNavigate();

//     const [userLogin, setUserLogin] = React.useState({
//         email: '',
//         password: ''
//     });

//     React.useEffect(() => {
//         onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//         });
//     }, []);

//     function handleSubmit(e) {
//         e.preventDefault();
//                 console.log(userLogin.email,userLogin.password) //Attention change this

//         signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
//           .then((cred)=>{console.log("user logined:"+cred.user)
//           sessionStorage.setItem("Auth Token", auth.currentUser.accessToken);
//           sessionStorage.setItem("uid", auth.currentUser.uid);
//           sessionStorage.setItem("email", auth.currentUser.email);
//           navigate("/")} )
//           .catch((err) => { console.log(err) })
//     }

//     function handleChange(e) {
//         console.log("change")
//         const { type, value } = e.target;
//         setUserLogin((prev) => ({ ...prev, [type]: value }))
//       }

//     function handlePersistance(e){
//         setPersistence(auth, browserSessionPersistence)
//         .then((email, password) => {
//             return signInWithEmailAndPassword(auth, email, password);
//         })
//         .catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//         });
//     }

//     function handleGoogle(e){
//         e.preventDefault();
//                 console.log(userLogin.email,userLogin.password)
//         signInWithPopup(auth, provider)
//         .then((cred)=>{
//             console.log(cred);
//             sessionStorage.setItem("Auth Token", auth.currentUser.accessToken);
//             sessionStorage.setItem("uid", auth.currentUser.uid);
//             sessionStorage.setItem("email", auth.currentUser.email);
//             navigate("/")
//         })
//         .catch((err) => { console.log(err) })
//     }

//     const {forgotPassword} = useAuth();

//     const forgotPasswordHandler = () => {
//         console.log(userLogin.email)
//         const email = userLogin.email;
//         if (email)
//           forgotPassword(email).then(() => {
//             userLogin.email = "";
//           });
//       };

//   return (
//     <div className='intro-container'>
//         <div className='form-container'>
//             <img src={Logo} className='logo' alt=''/>
//             <h1 className='title-sign'>Welcome back</h1>
//             <p className='details'>Welcome back! Please enter your details</p>
//             <form className='form-signup'>
//                 <label className='email-label'>Email</label>
//                 <input
//                     className='details-input'
//                     type="email"
//                     name="email"
//                     onChange={handleChange}
//                     placeholder='Enter your email address'
//                 />
//                 <label className='password-label'>Password</label>
//                 <input
//                     className='details-input'
//                     type="password"
//                     name="password"
//                     onChange={handleChange}
//                     placeholder='·······'/>
//                 <section className='options-section'>
//                     <div>
//                         <input className='remember-input' type='checkbox' onChange={handlePersistance} />
//                         <label className='remember-label'>Remember for 30 Days</label>
//                     </div>
//                     <p onClick={forgotPasswordHandler}>Forgot password</p>
//                 </section>
//                 <button
//                     onClick={handleSubmit}
//                     className='sign-btn'>
//                         Sign in
//                 </button>
//                 <button
//                     onClick={handleGoogle}
//                     className='google-btn'>
//                     <img src={google} alt=''/>
//                     Sign in with google
//                 </button>
//                 <p className='question'>Don't have an account? <Link to="/signup">Sign up for free</Link></p>
//                 <img src={vector} className='vector' alt=''/>
//             </form>
//         </div>
//         <img src={Main} alt=''/>
//     </div>
//   )
// }

// // Signup
// import React from "react";
// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider, db } from "../../firebase-config";
// import { collection, addDoc } from "firebase/firestore";
// import { nanoid } from "nanoid";
// import { useAuth } from "../../Contexts/RequireAuth.js";
// import Logo from "../../images/Logo.svg";
// import google from "../../images/Google.svg";
// import vector from "../../images/Vector.svg";
// import Main from "../../images/Intro_img.svg";
// import "./signup.css";

// export default function Signup() {
//   const { signup, setDisplayName, signInGoogle, createUserDetails } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   //Create a user, set a display name, create user details
//   const handleSubmit = async e => {
//     e.preventDefault();
//     if (Object.keys(errors).length === 0) {
//       try {
//         setLoading(true);
//         const { user } = await signup(data.email, data.password);
//         await setDisplayName(user, data.name);
//         await createUserDetails(user.uid, data.name, data.email);
//         navigate("/", { replace: true });
//       } catch (err) {
//         setErrors({ name: "Failed to create an account" });
//       }
//     }
//     setLoading(false);
//   };

//   //Check for errors and set Errors
//   useEffect(() => {
//     setErrors({});
//     if (data.password.length < 6 && data.password !== "") {
//       setErrors(prev => ({
//         ...prev,
//         password: "Password is too short",
//       }));
//     }
//     if (!/.+@.+\..+/.test(data.email) && data.email !== "") {
//       setErrors(prev => ({
//         ...prev,
//         email: "Email is incorrect",
//       }));
//     }
//     if (!/^[a-zA-Z\s]+$/g.test(data.name) && data.name !== "") {
//       setErrors(prev => ({
//         ...prev,
//         name: "Name can contain only letters",
//       }));
//     }
//   }, [data]);

//   // function handleGoogle(e){
//   //     e.preventDefault();
//   //             console.log(userSign.email,userSign.password)
//   //     signInWithPopup(auth, provider)
//   //     .then((cred)=>{
//   //         console.log(cred);
//   //     })
//   //     .catch((err) => { console.log(err) })
//   // }

//   return (
//     <div className="intro-container">
//       <div className="form-container">
//         <img src={Logo} className="logo" alt="" />
//         <h1 className="title-sign">Create a new account</h1>
//         <p className="details">Welcome back! Please enter your details</p>
//         <form className="form-signup" onSubmit={handleSubmit}>
//           <label className="name-label">Full Name</label>
//           <input
//             className="details-input"
//             type="text"
//             name="name"
//             onChange={handleChange}
//             value={data.name}
//             placeholder="Enter your full name"
//           />
//           <label className="email-label">Email</label>
//           <input
//             className="details-input"
//             type="email"
//             name="email"
//             onChange={handleChange}
//             value={data.email}
//             placeholder="Enter your email address"
//           />
//           <label className="password-label">Password</label>
//           <input
//             className="details-input"
//             type="password"
//             name="password"
//             onChange={handleChange}
//             value={data.password}
//             placeholder="·······"
//           />
//           <button onClick={handleSubmit} className="sign-btn">
//             Sign up
//           </button>
//           <button className="google-btn">
//             <img src={google} alt="" />
//             Sign up with google
//           </button>
//           <p className="question">
//             Already have an account? <Link to="/signin">Sign in</Link>
//           </p>
//           <img className="vector" src={vector} alt="" />
//         </form>
//       </div>
//       <img src={Main} alt="" />
//     </div>
//   );
// }

// // RequireAuth/Auth

// import React, { createContext } from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useContext } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   updateProfile,
//   GoogleAuthProvider,
//   signInWithPopup,
//   updateEmail,
//   updatePassword,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { auth, db } from "../firebase-config";
// import { getDoc, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export default function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState();
//   const [userDetails, setUserDetails] = useState({});
//   const [loading, setLoading] = useState(true);
//   const provider = new GoogleAuthProvider();

//   function signup(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password);
//   }
//   function login(email, password) {
//     return signInWithEmailAndPassword(auth, email, password);
//   }
//   function logout() {
//     return signOut(auth);
//   }
//   function setDisplayName(user, name) {
//     return updateProfile(user, {
//       displayName: name,
//     });
//   }
//   function updateUsersEmail(email) {
//     return updateEmail(currentUser, email);
//   }
//   function updateUsersPassword(password) {
//     return updatePassword(currentUser, password);
//   }
//   function updateUser(update) {
//     return updateDoc(doc(db, "users", currentUser.uid), update);
//   }
//   function createUserDetails(uid, name, email) {
//     return setDoc(doc(db, "users", uid), {
//       displayName: name,
//       email: email,
//       firstName: "",
//       lastName: "",
//       dateOfBirth: "",
//       mobileNumber: "",
//     });
//   }

//   //   const forgotPassword = email => {
//   //     return sendPasswordResetEmail(auth, email);
//   //   };

//   useEffect(() => {
//     setLoading(true);
//     const unsubscribe = onAuthStateChanged(auth, user => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     if (currentUser) {
//       const docRef = doc(db, "users", currentUser.uid);
//       onSnapshot(docRef, async doc => {
//         const info = doc.data();
//         setUserDetails(info);
//       });
//     }
//   }, [currentUser]);

//   const value = {
//     currentUser,
//     userDetails,
//     signup,
//     login,
//     logout,
//     updateUsersEmail,
//     updateUsersPassword,
//     setDisplayName,
//     createUserDetails,
//     updateUser,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// // Firebase-config
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore";
// import { GoogleAuthProvider } from "firebase/auth";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCX2m4C5w2UbfXiq4QEGeCdYHpLmTl7qrI",
//   authDomain: "expenses-tracker-1aa19.firebaseapp.com",
//   projectId: "expenses-tracker-1aa19",
//   storageBucket: "expenses-tracker-1aa19.appspot.com",
//   messagingSenderId: "193626556002",
//   appId: "1:193626556002:web:8af47e5bd39ae99a68333b",
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth();

// export const provider = new GoogleAuthProvider();

// // Index
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// // import reportWebVitals from './reportWebVitals';

// import { BrowserRouter } from "react-router-dom";
// import AuthProvider from "./Contexts/RequireAuth";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <AuthProvider>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </AuthProvider>
// );
