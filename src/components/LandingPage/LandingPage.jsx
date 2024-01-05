import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm.jsx';

function LandingPage() {

  // toggle for login display
  const [login, setLogin] = useState(true);

  const history = useHistory();

  const loginOrRegister = (event) => {
    // history.push('/login');
    console.log(`setting login or register`);
    setLogin(!login);
    console.log(`login:`, login);
  };

  return (
    <div id='landing-page'>

      <div id='title-hobbit'><h2>Hobbit Hues</h2></div>


      <div id='login-boxes'>

        <div>
          <div className={login ? 'visible' : 'invisible'}>
            <LoginForm />

          </div>


          <div className={login ? 'invisible' : 'visible'}>
            <RegisterForm />

          </div>


          <div className={login ? 'visible' : 'invisible'}>
            {/* <h4>Don't have an Account?</h4> */}
            <button className="btn" onClick={loginOrRegister}>
              Register
            </button>
          </div>

          <div className={login ? 'invisible' : 'visible'}>
            {/* <h4>Already a Member?</h4> */}
            <button className="btn" onClick={loginOrRegister}>
              Login
            </button>
          </div>


        </div>



      </div>
    </div>
  );
}

export default LandingPage;


