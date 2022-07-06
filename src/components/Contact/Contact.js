import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <div className='contact-container'>
      <h3>Contact</h3>
      <form>
        <input type='text' placeholder='Name*'></input>
        <input type='email' placeholder='Email*'></input>
        <input type='title' placeholder='Title*'></input>
        <input type='your-message' placeholder='Your Message*'></input>
        <button>Post Comment</button>
      </form>
      </div>
  )
}
