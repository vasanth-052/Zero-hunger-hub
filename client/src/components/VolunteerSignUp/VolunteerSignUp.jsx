// client/src/components/VolunteerSignUp/VolunteerSignUp.js

import React, { useState } from 'react';
import axios from 'axios';

const VolunteerSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [availability, setAvailability] = useState('');
  const [signUpMessage, setSignUpMessage] = useState('');

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/volunteers/add', { name, email, phone, availability })
      .then(() => {
        setSignUpMessage('Volunteer sign-up successful!');
        setName('');
        setEmail('');
        setPhone('');
        setAvailability('');
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Volunteer Sign-Up</h2>
      <form onSubmit={handleSignUpSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <br />
        <label>
          Availability:
          <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>{signUpMessage}</p>
    </div>
  );
}

export default VolunteerSignUp;
