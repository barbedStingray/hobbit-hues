import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser


  return (
    <form className="formPanel" onSubmit={registerUser}>

      <h2>Register</h2>

      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}

      <label htmlFor="username">
        <input
          type="text"
          placeholder='Username'
          name="username"
          value={username}
          required
          className='signInboxes'
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>

      <label htmlFor="password">
        <input
          type="password"
          placeholder='Password'
          name="password"
          value={password}
          required
          className='signInboxes'
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <input className="btn" type="submit" name="submit" value="Register" />
    
    </form>
  );
}

export default RegisterForm;
