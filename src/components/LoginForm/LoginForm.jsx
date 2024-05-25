import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login


  return (
    <form className="formPanel" onSubmit={login}>

      <h2>Login</h2>

      <label htmlFor="username">
        <input
          type="text"
          placeholder='Username'
          name="username"
          required
          className='signInboxes'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>

      <label htmlFor="password">
        <input
          type="password"
          placeholder='Password'
          name="password"
          required
          className='signInboxes'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <input className="btn" type="submit" name="submit" value="Log In" />
    
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

    </form>
  );
}

export default LoginForm;
