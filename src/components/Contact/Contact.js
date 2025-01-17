import React from "react";
import "./Contact.css";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";

export default function Contact() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const [isError, setIsError] = useState({
    name: false,
    email: false,
    success: false,
  });

  const contactRef = collection(db, "contact");

  function nameChecker() {
    if (details.name !== "")
      setIsError(prevError => ({
        ...prevError,
        name: !/^[a-z ,.'-]+$/i.test(details.name),
      }));
  }

  function emailChecker() {
    if (details.email !== "")
      setIsError(prevError => ({
        ...prevError,
        email: !/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(details.email),
      }));
  }

  useEffect(() => {
    nameChecker();
    emailChecker();
  }, [details]);

  function handleChange(event) {
    const { name, value } = event.target;
    setDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isError.name && !isError.email) {
      await addDoc(contactRef, details);
      setDetails({
        name: "",
        email: "",
        title: "",
        message: "",
      });
      setIsError({
        name: false,
        email: false,
        success: true,
      });
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-container">
        <form className="login-form" onSubmit={event => handleSubmit(event)}>
          <h2 className="span-two">Contact</h2>
          <div className="form-element">
            <div className="label-container">
              <label htmlFor="name">Name*</label>
              <p className={isError.name ? "visible" : ""}>
                Name must not contain numbers
              </p>
            </div>
            <input
              type="text"
              name="name"
              id="name"
              value={details.name}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="form-element">
            <div className="label-container">
              <label htmlFor="email">Email*</label>
              <p className={isError.email ? "visible" : ""}>
                Please enter a valid Email address
              </p>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              value={details.email}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="form-element span-two">
            <div className="label-container">
              <label htmlFor="title">Title</label>
            </div>
            <input
              type="text"
              name="title"
              id="title"
              value={details.title}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="form-element span-two">
            <div className="label-container">
              <label htmlFor="your-mesage">Your Message</label>
              <p className={isError.message ? "visible" : ""}></p>
            </div>
            <textarea
              type="text"
              name="message"
              id="message"
              value={details.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-element">
            <button className="submit-message-button" type="submit">
              Submit Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
